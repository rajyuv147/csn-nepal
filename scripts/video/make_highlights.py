"""Render the CSN Nepal highlights video (Bhotekoshi Flood Response + overall support).

Usage (from the repo root):
    python3 scripts/video/make_highlights.py [output.mp4]

Requires Python 3 with Pillow + NumPy, and ffmpeg (libx264 + aac) on PATH.
Photos come from public/gallery, the logo from public/logo.png and src/app/icon.png.
Figures shown are the ones published on the website (src/app/page.tsx, src/lib/data.ts).
"""

import math
import os
import subprocess
import sys
import tempfile
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "public", "videos", "csn-highlights.mp4")

W, H, FPS = 1920, 1080, 25
XFADE = 0.6  # seconds of cross-dissolve between segments

FOREST_950 = (3, 46, 26)
FOREST_900 = (4, 61, 36)
FOREST_800 = (1, 114, 59)
LEAF = (65, 147, 104)
SUN = (246, 178, 49)
PAPER = (255, 253, 247)
INK = (16, 35, 26)
MINT = (231, 243, 236)

FONT_DIR = "/usr/share/fonts/opentype/inter"


def font(weight, size):
    names = {
        "bold": "InterDisplay-Bold.otf",
        "semibold": "InterDisplay-SemiBold.otf",
        "medium": "InterDisplay-Medium.otf",
        "regular": "Inter-Regular.otf",
    }
    path = os.path.join(FONT_DIR, names[weight])
    if not os.path.exists(path):
        path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    return ImageFont.truetype(path, size)


EXTRA_PHOTOS = {
    60: "WhatsApp Image 2026-10-16 at 12.03.31.jpeg",
    61: "WhatsApp Image 2026-10-16 at 12.05.15.jpeg",
    62: "WhatsApp Image 2026-10-16 at 12.05.16.jpeg",
    63: "WhatsApp Image 2026-10-16 at 12.05.16 (1).jpeg",
}


def photo_path(n):
    name = EXTRA_PHOTOS.get(n) or f"photo-{n:02d}.jpeg"
    return os.path.join(ROOT, "public", "gallery", name)


_photo_cache = {}


def load_photo(n):
    if n not in _photo_cache:
        im = Image.open(photo_path(n))
        im = _exif_transpose(im).convert("RGB")
        _photo_cache[n] = im
    return _photo_cache[n]


def _exif_transpose(im):
    from PIL import ImageOps

    return ImageOps.exif_transpose(im)


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def ease_out(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


# ---------------------------------------------------------------- logo assets

def _logo_lockup():
    im = Image.open(os.path.join(ROOT, "public", "logo.png")).convert("RGBA")
    return im


def _logo_mark():
    # icon.png has an opaque white background; key it out so the mark sits on any backdrop.
    arr = np.array(Image.open(os.path.join(ROOT, "src", "app", "icon.png")).convert("RGBA")).astype(np.int32)
    whiteness = arr[..., :3].min(axis=2)
    arr[..., 3] = np.clip((255 - whiteness) * 255 // 40, 0, 255) * arr[..., 3] // 255
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


LOGO = _logo_lockup()
MARK = _logo_mark()


def scaled(im, width):
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


# Watermark badge: logo lockup on a white rounded pill, top-right of photo shots.
def _badge():
    logo = scaled(LOGO, 360)
    pad_x, pad_y = 22, 14
    b = Image.new("RGBA", (logo.width + pad_x * 2, logo.height + pad_y * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(b)
    d.rounded_rectangle((0, 0, b.width - 1, b.height - 1), radius=18, fill=(255, 255, 255, 235))
    b.alpha_composite(logo, (pad_x, pad_y))
    return b


BADGE = _badge()

# Bottom gradient used behind captions.
_grad = np.zeros((H, W, 4), dtype=np.uint8)
ys = np.arange(H)
alpha = np.clip((ys - H * 0.45) / (H * 0.55), 0, 1) ** 1.4 * 225
_grad[..., :3] = FOREST_950
_grad[..., 3] = alpha[:, None].astype(np.uint8)
BOTTOM_GRADIENT = Image.fromarray(_grad, "RGBA")


# ---------------------------------------------------------------- photo shots

def cover(im, w, h, zoom, fx=0.5, fy=0.5):
    """Crop `im` to fill w x h at `zoom` (>=1), centred on focus (fx, fy)."""
    scale = max(w / im.width, h / im.height) * zoom
    cw, ch = w / scale, h / scale
    cx = min(max(fx * im.width, cw / 2), im.width - cw / 2)
    cy = min(max(fy * im.height, ch / 2), im.height - ch / 2)
    box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
    return im.resize((w, h), Image.BILINEAR, box=box)


_bg_cache = {}


def portrait_background(n):
    if n not in _bg_cache:
        im = cover(load_photo(n), W // 4, H // 4, 1.0)
        im = im.filter(ImageFilter.GaussianBlur(10)).resize((W, H), Image.BILINEAR)
        dark = Image.new("RGB", (W, H), FOREST_950)
        _bg_cache[n] = Image.blend(im, dark, 0.45)
    return _bg_cache[n]


def render_photo(n, p, motion):
    """Ken Burns frame for photo n at progress p in [0,1]."""
    im = load_photo(n)
    z0, z1, fx0, fy0, fx1, fy1 = motion
    z = z0 + (z1 - z0) * p
    fx = fx0 + (fx1 - fx0) * p
    fy = fy0 + (fy1 - fy0) * p
    if im.width / im.height >= 1.2:
        return cover(im, W, H, z, fx, fy)
    # Portrait / square: blurred backdrop + framed photo.
    frame = portrait_background(n).copy()
    ph = int(H * 0.86)
    pw = int(ph * im.width / im.height)
    inner = cover(im, pw, ph, 1 + (z - 1) * 0.6, fx, fy)
    x = (W - pw) // 2
    y = (H - ph) // 2 - 30
    shadow = Image.new("RGBA", (pw + 40, ph + 40), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle((20, 20, pw + 20, ph + 20), fill=(0, 0, 0, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    frame.paste(shadow, (x - 20, y - 10), shadow)
    frame.paste(Image.new("RGB", (pw + 16, ph + 16), (255, 255, 255)), (x - 8, y - 8))
    frame.paste(inner, (x, y))
    return frame


MOTIONS = [
    (1.04, 1.16, 0.5, 0.5, 0.55, 0.45),
    (1.16, 1.04, 0.45, 0.55, 0.5, 0.5),
    (1.06, 1.18, 0.4, 0.5, 0.6, 0.5),
    (1.15, 1.05, 0.6, 0.45, 0.4, 0.55),
]


# ---------------------------------------------------------------- text helpers

def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def apply_alpha(layer, a):
    if a >= 0.999:
        return layer
    r, g, b, al = layer.split()
    al = al.point(lambda v: int(v * a))
    return Image.merge("RGBA", (r, g, b, al))


def caption_layer(chapter, title, sub, t_in):
    """Lower-third caption; t_in is seconds since the group started (for the reveal)."""
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    x = 110
    a = ease_out(t_in / 0.8)
    off = int((1 - a) * 40)
    f_chap = font("bold", 30)
    f_title = font("bold", 66)
    f_sub = font("medium", 34)
    title_lines = wrap(d, title, f_title, 1500)
    sub_lines = wrap(d, sub, f_sub, 1350) if sub else []
    block_h = 50 + len(title_lines) * 80 + (14 + len(sub_lines) * 46 if sub_lines else 0)
    y = H - 90 - block_h + off
    cw = d.textlength(chapter.upper(), font=f_chap)
    d.rounded_rectangle((x, y, x + cw + 36, y + 46), radius=23, fill=SUN + (255,))
    d.text((x + 18, y + 7), chapter.upper(), font=f_chap, fill=FOREST_950)
    y += 64
    for line in title_lines:
        d.text((x, y), line, font=f_title, fill=(255, 255, 255))
        y += 80
    if sub_lines:
        y += 10
        for line in sub_lines:
            d.text((x, y), line, font=f_sub, fill=(225, 238, 230))
            y += 46
    return apply_alpha(layer, a)


# ---------------------------------------------------------------- full-frame cards

def background_gradient(c0, c1):
    g = np.linspace(0, 1, H)[:, None, None]
    arr = np.array(c0)[None, None, :] * (1 - g) + np.array(c1)[None, None, :] * g
    arr = np.broadcast_to(arr, (H, W, 3)).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


GREEN_BG = background_gradient(FOREST_800, FOREST_950)
PAPER_BG = background_gradient(PAPER, MINT)


def draw_mountain_lines(img, alpha_val=40):
    """Subtle mountain-ridge motif echoing the logo."""
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    pts = [(0, H), (0, 860), (260, 700), (420, 800), (700, 600), (980, 780), (1240, 640),
           (1500, 760), (1700, 680), (W, 780), (W, H)]
    d.polygon(pts, fill=(255, 255, 255, alpha_val // 2))
    pts2 = [(0, H), (0, 940), (300, 840), (620, 920), (900, 820), (1200, 930), (1550, 850),
            (W, 920), (W, H)]
    d.polygon(pts2, fill=(255, 255, 255, alpha_val))
    img.paste(layer, (0, 0), layer)


GREEN_BG_RIDGES = GREEN_BG.copy()
draw_mountain_lines(GREEN_BG_RIDGES)


def centered(d, y, text, fnt, fill):
    w = d.textlength(text, font=fnt)
    d.text(((W - w) / 2, y), text, font=fnt, fill=fill)


def card_intro(t, dur):
    img = PAPER_BG.copy()
    a_mark = ease_out(t / 1.0)
    size = int(300 + 40 * a_mark)
    mark = scaled(MARK, size)
    mark = apply_alpha(mark, a_mark)
    img.paste(mark, ((W - mark.width) // 2, 120 + int((1 - a_mark) * 30)), mark)
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    a1 = ease_out((t - 0.8) / 0.8)
    centered(d, 500 + (1 - a1) * 20, "CO-OPERATION SOCIETY NEPAL", font("bold", 64), FOREST_800 + (int(255 * a1),))
    a2 = ease_out((t - 1.4) / 0.8)
    centered(d, 600, "Highlights of our contribution to society", font("medium", 44), INK + (int(255 * a2),))
    a3 = ease_out((t - 2.0) / 0.8)
    f = font("bold", 40)
    label = "BHOTEKOSHI FLOOD RESPONSE 2026  ·  NUWAKOT & RASUWA"
    w = d.textlength(label, font=f)
    x0 = (W - w) / 2 - 36
    d.rounded_rectangle((x0, 720, x0 + w + 72, 790), radius=35, fill=SUN + (int(255 * a3),))
    d.text((x0 + 36, 732), label, font=f, fill=FOREST_950 + (int(255 * a3),))
    a4 = ease_out((t - 2.6) / 0.8)
    centered(d, 870, "“Change is possible, let’s start from today”", font("medium", 36), LEAF + (int(255 * a4),))
    img.paste(layer, (0, 0), layer)
    return img


def card_title(eyebrow, title, sub, photo=None):
    def render(t, dur):
        if photo is not None:
            img = cover(load_photo(photo), W, H, 1.05 + 0.06 * t / dur)
            img = Image.blend(img, Image.new("RGB", (W, H), FOREST_950), 0.72)
        else:
            img = GREEN_BG_RIDGES.copy()
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        a1 = ease_out(t / 0.7)
        centered(d, 360 - (1 - a1) * 20, eyebrow.upper(), font("bold", 36), SUN + (int(255 * a1),))
        a2 = ease_out((t - 0.3) / 0.8)
        f = font("bold", 92)
        lines = wrap(d, title, f, 1600)
        y = 430
        for line in lines:
            centered(d, y + (1 - a2) * 30, line, f, (255, 255, 255, int(255 * a2)))
            y += 108
        a3 = ease_out((t - 0.8) / 0.8)
        fs = font("medium", 40)
        for line in wrap(d, sub, fs, 1400):
            centered(d, y + 30, line, fs, (220, 236, 226, int(255 * a3)))
            y += 54
        img.paste(layer, (0, 0), layer)
        return img

    return render


def fmt(n):
    return f"{n:,}"


def card_stats(eyebrow, title, stats, cols=3, note=None):
    """Animated counter grid. stats: list of (number, suffix, label)."""

    def render(t, dur):
        img = GREEN_BG_RIDGES.copy()
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        a = ease_out(t / 0.7)
        centered(d, 110, eyebrow.upper(), font("bold", 34), SUN + (int(255 * a),))
        centered(d, 160, title, font("bold", 76), (255, 255, 255, int(255 * a)))
        rows = math.ceil(len(stats) / cols)
        cell_w, cell_h, gap = 500, 250, 40
        grid_w = cols * cell_w + (cols - 1) * gap
        top = 320 if rows == 2 else 400
        for i, (num, suffix, label) in enumerate(stats):
            r, c = divmod(i, cols)
            n_in_row = min(cols, len(stats) - r * cols)
            row_w = n_in_row * cell_w + (n_in_row - 1) * gap
            x = (W - row_w) // 2 + c * (cell_w + gap)
            y = top + r * (cell_h + gap)
            delay = 0.3 + i * 0.15
            ai = ease_out((t - delay) / 0.6)
            if ai <= 0:
                continue
            al = int(255 * ai)
            d.rounded_rectangle((x, y + (1 - ai) * 30, x + cell_w, y + cell_h + (1 - ai) * 30), radius=28,
                                fill=(255, 255, 255, int(22 * ai)), outline=(255, 255, 255, int(60 * ai)), width=2)
            count = int(round(num * ease_out((t - delay) / 1.6)))
            label_num = fmt(count) + suffix
            fn = font("bold", 96)
            tw = d.textlength(label_num, font=fn)
            d.text((x + (cell_w - tw) / 2, y + 36 + (1 - ai) * 30), label_num, font=fn, fill=SUN + (al,))
            fl = font("medium", 34)
            lines = wrap(d, label, fl, cell_w - 40)
            ly = y + 160 + (1 - ai) * 30
            for line in lines:
                lw = d.textlength(line, font=fl)
                d.text((x + (cell_w - lw) / 2, ly), line, font=fl, fill=(255, 255, 255, al))
                ly += 42
        if note:
            an = ease_out((t - 1.5) / 0.8)
            centered(d, H - 110, note, font("medium", 30), (200, 225, 210, int(255 * an)))
        img.paste(layer, (0, 0), layer)
        return img

    return render


def card_chips(eyebrow, title, chips, footer):
    def render(t, dur):
        img = PAPER_BG.copy()
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        a = ease_out(t / 0.7)
        centered(d, 150, eyebrow.upper(), font("bold", 34), LEAF + (int(255 * a),))
        f = font("bold", 74)
        y = 205
        for line in wrap(d, title, f, 1600):
            centered(d, y, line, f, FOREST_900 + (int(255 * a),))
            y += 90
        fc = font("semibold", 40)
        # lay chips out in centred rows
        rows, cur, cur_w = [], [], 0
        for c in chips:
            w = d.textlength(c, font=fc) + 70
            if cur and cur_w + w + 24 > 1600:
                rows.append((cur, cur_w))
                cur, cur_w = [], 0
            cur.append((c, w))
            cur_w += w + (24 if cur_w else 0)
        rows.append((cur, cur_w))
        y += 70
        i = 0
        for row, row_w in rows:
            x = (W - row_w) / 2
            for c, w in row:
                ai = ease_out((t - 0.5 - i * 0.12) / 0.5)
                if ai > 0:
                    al = int(255 * ai)
                    yy = y + (1 - ai) * 20
                    d.rounded_rectangle((x, yy, x + w, yy + 84), radius=42, fill=FOREST_800 + (al,))
                    d.text((x + 35, yy + 18), c, font=fc, fill=(255, 255, 255, al))
                x += w + 24
                i += 1
            y += 108
        af = ease_out((t - 1.8) / 0.8)
        ff = font("medium", 38)
        y += 50
        for line in footer:
            centered(d, y, line, ff, INK + (int(255 * af),))
            y += 56
        img.paste(layer, (0, 0), layer)
        return img

    return render


def card_outro(t, dur):
    img = PAPER_BG.copy()
    a = ease_out(t / 1.0)
    logo = apply_alpha(scaled(LOGO, 1300), a)
    img.paste(logo, ((W - logo.width) // 2, 230 + int((1 - a) * 30)), logo)
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    a2 = ease_out((t - 0.9) / 0.8)
    centered(d, 560, "Thank you to our communities, volunteers and partners", font("bold", 52),
             FOREST_900 + (int(255 * a2),))
    centered(d, 630, "Bhotekoshi Flood Response with CARITAS Nepal and CRS", font("medium", 38),
             INK + (int(255 * a2),))
    a3 = ease_out((t - 1.6) / 0.8)
    centered(d, 780, "www.csnnepal.org.np", font("bold", 46), FOREST_800 + (int(255 * a3),))
    centered(d, 850, "csnnepal@gmail.com   ·   +977-9851078685   ·   Bidur-4, Battar, Nuwakot",
             font("medium", 32), INK + (int(255 * a3),))
    img.paste(layer, (0, 0), layer)
    return img


# ---------------------------------------------------------------- timeline

# Each photo group: (chapter, title, subtitle, [photo numbers]); each photo is on screen SHOT seconds.
SHOT = 3.2
GROUPS = [
    ("The disaster", "Bhotekoshi floods strike Nuwakot & Rasuwa",
     "Homes, roads and riverbanks along the Bhotekoshi were torn apart.", [16, 5, 13, 15]),
    ("On the ground", "CSN team surveys the flood damage",
     "Field assessment of the flood-torn riverbed and damaged banks.", [1, 7, 3]),
    ("People first", "157 volunteers mobilised",
     "Orientation and interaction programme for response staff and volunteers in Bidur.", [19, 21]),
    ("Child protection", "15 child-friendly spaces for 427 children",
     "Safe spaces with trained facilitators — learning, play and psychosocial care.", [29, 32, 26, 38, 36]),
    ("Shelter & safety", "Holding shelters in Bidur",
     "Tents, water and safe spaces with Caritas and CSN volunteers on duty.", [27, 30]),
    ("Relief distribution", "Relief reaching flood-affected families",
     "Kitchen and bedding NFI sets for 600 households across Nuwakot and Rasuwa, with CARITAS Nepal.",
     [46, 54, 51, 55, 47, 61, 63]),
    ("Building skills", "Training for recovery and livelihoods",
     "Small Hotel and Lodge Management Training for local entrepreneurs.", [39, 44]),
]

segments = []  # (duration, render_fn(t, dur) -> RGB image, caption_group or None)

segments.append((5.0, card_intro, None))
segments.append((3.6, card_title("Bhotekoshi Flood Response · 2026", "When the river rose, CSN responded",
                                 "Relief, shelter, child protection, WASH and volunteer mobilisation across "
                                 "Nuwakot and Rasuwa.", photo=14), None))

shot_index = 0
for gi, (chapter, title, sub, photos) in enumerate(GROUPS):
    for pi, n in enumerate(photos):
        motion = MOTIONS[shot_index % len(MOTIONS)]
        shot_index += 1

        def make(n=n, motion=motion):
            return lambda t, dur: render_photo(n, t / dur, motion)

        segments.append((SHOT, make(), gi))

segments.append((6.5, card_stats("CSN response at a glance", "Bhotekoshi Flood Response", [
    (2155, "", "people reached"),
    (499, "", "households supported"),
    (427, "", "children & students supported"),
    (15, "", "child-friendly spaces"),
    (157, "", "volunteers mobilised"),
    (50, "", "people in cash-for-work"),
]), None))
segments.append((5.5, card_stats("Relief assistance", "Essential kits delivered", [
    (200, "", "dignity kits"),
    (125, "", "food packages"),
    (55, "", "baby kits"),
    (50, "", "WASH kits"),
    (5, "", "water storage & WASH facilities"),
    (600, "", "households with kitchen & bedding sets"),
], note="With support from CARITAS Nepal and CRS"), None))
segments.append((3.6, card_title("Beyond the flood", "Serving communities since 2013",
                                 "Patient, community-rooted work for children, families and youth.",
                                 photo=34), None))
segments.append((7.0, card_chips("What we do", "Overall support to the community", [
    "Education & scholarships", "Child protection", "Health, water & sanitation",
    "Livelihood & employment", "Disaster risk reduction", "Agriculture & environment",
    "Youth, tourism & infrastructure",
], [
    "Nuwakot · Rasuwa · Dhading · Kathmandu — and project reach in Tanahun, Syangja and Makawanpur",
    "Scholarships since 2013 · 180 young leaders trained · 100+ jobs on the Gosaikunda trail",
]), None))
segments.append((5.0, card_chips("Together with", "Our partners", [
    "CARITAS Nepal", "CRS", "UNDP Nepal", "UNICEF Nepal", "Nepal Tourism Board",
    "Habitat for Humanity Nepal", "APC Nepal / France", "SCAI Australia", "Local governments",
], [
    "Working hand in hand with communities, local governments and networks.",
]), None))
segments.append((6.5, card_outro, None))


def build_timeline():
    """Return list of (start, duration, render, group) with XFADE overlaps."""
    out, t = [], 0.0
    for dur, fn, g in segments:
        out.append((t, dur, fn, g))
        t += dur - XFADE
    total = t + XFADE
    return out, total


TIMELINE, TOTAL = build_timeline()

# Group visibility windows for persistent captions.
GROUP_WINDOWS = {}
for start, dur, fn, g in TIMELINE:
    if g is None:
        continue
    s, e = GROUP_WINDOWS.get(g, (start, start + dur))
    GROUP_WINDOWS[g] = (min(s, start), max(e, start + dur))


def frame_at(t):
    active = [(s, d, fn, g) for (s, d, fn, g) in TIMELINE if s <= t < s + d]
    img = None
    for s, d, fn, g in active:
        local = t - s
        f = fn(local, d)
        if img is None:
            img = f
        else:
            mix = ease(local / XFADE)
            img = Image.blend(img, f, mix)
    if img is None:
        img = Image.new("RGB", (W, H), PAPER)
    img = img.convert("RGBA")

    groups = {g for (_, _, _, g) in active if g is not None}
    if groups:
        # gradient + watermark follow the cross-dissolve in/out of the whole photo section
        photo_start = min(w[0] for w in GROUP_WINDOWS.values())
        photo_end = max(w[1] for w in GROUP_WINDOWS.values())
        section_a = min(ease((t - photo_start) / XFADE), ease((photo_end - t) / XFADE))
        img.alpha_composite(apply_alpha(BOTTOM_GRADIENT, section_a))
        half = XFADE / 2
        for g in groups:
            gs, ge = GROUP_WINDOWS[g]
            # captions hand over at the midpoint of a cross-dissolve so two never overlap
            ga = min(ease((t - gs - half) / 0.4), ease((ge - half - t) / 0.3))
            if ga <= 0:
                continue
            chapter, title, sub, _ = GROUPS[g]
            img.alpha_composite(apply_alpha(caption_layer(chapter, title, sub, t - gs - half), ga))
        img.alpha_composite(apply_alpha(BADGE, section_a), (W - BADGE.width - 50, 44))

    # global fade from/to black at the very ends
    edge = min(ease(t / 0.6), ease((TOTAL - t) / 0.8))
    if edge < 1:
        img = Image.blend(Image.new("RGBA", (W, H), (0, 0, 0, 255)), img, edge)
    return img.convert("RGB")


# ---------------------------------------------------------------- music

def synth_music(path, seconds, sr=44100):
    """Original, gentle piano-and-pad bed (no third-party audio)."""
    n = int(seconds * sr)
    t = np.arange(n) / sr
    out = np.zeros(n)

    def midi(m):
        return 440.0 * 2 ** ((m - 69) / 12)

    # I – V – vi – IV in D major, 4 s per chord
    chords = [[50, 57, 62, 66], [45, 57, 61, 64], [47, 54, 59, 62], [43, 55, 59, 62]]
    bar = 4.0
    for k in range(int(math.ceil(seconds / bar))):
        chord = chords[k % 4]
        s0 = int(k * bar * sr)
        s1 = min(n, int((k + 1) * bar * sr + 1.5 * sr))
        if s0 >= n:
            break
        tt = t[s0:s1] - k * bar
        env = np.minimum(1, tt / 1.2) * np.exp(-np.maximum(0, tt - bar) * 2.5)
        for m in chord:
            f = midi(m)
            out[s0:s1] += 0.05 * env * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt + 0.5))
        # piano-like arpeggio, eighth notes
        arp = [chord[1] + 12, chord[2] + 12, chord[3] + 12, chord[2] + 12,
               chord[1] + 24, chord[3] + 12, chord[2] + 12, chord[3] + 12]
        for j, m in enumerate(arp):
            a0 = int((k * bar + j * bar / 8) * sr)
            if a0 >= n:
                break
            a1 = min(n, a0 + int(2.0 * sr))
            ta = t[a0:a1] - (k * bar + j * bar / 8)
            f = midi(m)
            e = np.minimum(1, ta / 0.005) * np.exp(-ta * 3.0)
            tone = np.sin(2 * np.pi * f * ta) + 0.35 * np.sin(2 * np.pi * 2 * f * ta) + 0.12 * np.sin(2 * np.pi * 3 * f * ta)
            out[a0:a1] += 0.07 * e * tone
    # soft bass
    for k in range(int(math.ceil(seconds / bar))):
        s0 = int(k * bar * sr)
        if s0 >= n:
            break
        s1 = min(n, s0 + int(bar * sr))
        tt = t[s0:s1] - k * bar
        f = midi(chords[k % 4][0] - 12)
        out[s0:s1] += 0.09 * np.minimum(1, tt / 0.05) * np.exp(-tt * 0.6) * np.sin(2 * np.pi * f * tt)

    # simple stereo delay for space
    d = int(0.33 * sr)
    left = out.copy()
    right = out.copy()
    right[d:] += 0.35 * out[:-d]
    left[2 * d:] += 0.25 * out[:-2 * d]
    stereo = np.stack([left, right], axis=1)
    fade_in = np.minimum(1, t / 2.0)
    fade_out = np.minimum(1, (seconds - t) / 3.0).clip(0, 1)
    stereo *= (fade_in * fade_out)[:, None]
    stereo /= max(1e-6, np.abs(stereo).max()) / 0.6
    pcm = (stereo * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(pcm.tobytes())


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    nframes = int(round(TOTAL * FPS))
    print(f"Rendering {nframes} frames ({TOTAL:.1f}s) -> {OUT}", flush=True)
    with tempfile.TemporaryDirectory() as tmp:
        audio = os.path.join(tmp, "music.wav")
        synth_music(audio, TOTAL)
        cmd = [
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
            "-i", audio,
            "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart",
            OUT,
        ]
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for i in range(nframes):
            proc.stdin.write(frame_at(i / FPS).tobytes())
            if i % 250 == 0:
                print(f"  frame {i}/{nframes}", flush=True)
        proc.stdin.close()
        if proc.wait() != 0:
            sys.exit("ffmpeg failed")
    print("Done.")


if __name__ == "__main__":
    if os.environ.get("PREVIEW"):
        # PREVIEW="3,20,40" renders still frames at those seconds for a quick look.
        for s in os.environ["PREVIEW"].split(","):
            frame_at(float(s)).save(os.path.join(os.path.dirname(OUT), f"preview-{s}.jpg"), quality=85)
        print(f"total {TOTAL:.1f}s")
    else:
        main()
