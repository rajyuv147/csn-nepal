"""Generate the voice-over clips for the highlights video with Kokoro TTS (open weights).

Usage (from the repo root):
    pip install kokoro-onnx soundfile
    # model files: https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
    python3 scripts/video/make_narration.py path/to/kokoro-v1.0.onnx path/to/voices-v1.0.bin

Writes one WAV per line in narration.py to scripts/video/narration/<key>.wav, which
make_highlights.py mixes over the music.
"""

import os
import sys

import soundfile as sf
from kokoro_onnx import Kokoro

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from narration import NARRATION  # noqa: E402

VOICE = "af_heart"
SPEED = 0.95

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "narration")


def main():
    model, voices = sys.argv[1], sys.argv[2]
    kokoro = Kokoro(model, voices)
    os.makedirs(OUT_DIR, exist_ok=True)
    for key, text in NARRATION.items():
        samples, sr = kokoro.create(text, voice=VOICE, speed=SPEED, lang="en-us")
        path = os.path.join(OUT_DIR, f"{key}.wav")
        sf.write(path, samples, sr, subtype="PCM_16")
        print(f"{key}: {len(samples) / sr:.1f}s")


if __name__ == "__main__":
    main()
