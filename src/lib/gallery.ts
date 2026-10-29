export type GalleryAlbum = {
  slug: string;
  title: string;
  detail: string;
  publishedDate: string;
  from: number;
  to: number;
};

export const GALLERIES: GalleryAlbum[] = [
  {
    slug: "flood-damage-field-assessment",
    title: "Flood damage field assessment",
    detail: "CSN team surveying the flood-torn Bhotekoshi riverbed and damaged banks.",
    publishedDate: "Oct 2, 2026",
    from: 1,
    to: 16,
  },
  {
    slug: "staff-volunteers-orientation",
    title: "Staff & volunteers orientation - Bidur, Oct 2026",
    detail: "Orientation and interaction program for response staff and volunteers.",
    publishedDate: "Oct 2, 2026",
    from: 17,
    to: 23,
  },
  {
    slug: "relief-kit-distribution",
    title: "Relief kit distribution",
    detail: "CRS-supported Bhotekoshi Flood Response kits reaching affected families.",
    publishedDate: "Oct 2, 2026",
    from: 24,
    to: 24,
  },
  {
    slug: "holding-shelter-child-friendly-space-bidur",
    title: "Holding shelter & child-friendly space - Bidur",
    detail: "Tents, water and safe spaces with Caritas and CSN volunteers on duty.",
    publishedDate: "Oct 2, 2026",
    from: 25,
    to: 31,
  },
  {
    slug: "child-friendly-safe-space-kispang",
    title: "Child-friendly safe space - Kispang",
    detail: "Balmaitri surakshit sthan at Kispang RM-9, Archale - learning through play.",
    publishedDate: "Oct 2, 2026",
    from: 32,
    to: 38,
  },
  {
    slug: "small-hotel-lodge-management-training",
    title: "Small Hotel and Lodge Management Training",
    detail: "Training sessions for CSN staff and volunteers on response protocols, child protection and community mobilization.",
    publishedDate: "Oct 3, 2026",
    from: 39,
    to: 45,
  },
  {
    slug: "relief-materials-caritas-nepal",
    title: "Relief materials with support of CARITAS Nepal",
    detail:
      "Kitchen and bedding NFI sets for 600 households across Nuwakot and Rasuwa, distributed with support from CARITAS Nepal.",
    publishedDate: "Oct 16, 2026",
    from: 46,
    to: 63,
  },
  {
    slug: "lamibagaicha-holding-center",
    title: "Lamibagaicha Holding Center & Community Kitchen",
    detail:
      "Temporary shelter at Bidur-5, Lamibagaicha, Nuwakot, managed by CRS, Caritas and CSN, with daily meals from the community kitchen and CSN's child safeguarding code of conduct on display.",
    publishedDate: "Oct 29, 2026",
    from: 64,
    to: 68,
  },
];

const ADDITIONAL_GALLERY_PHOTOS: Record<number, string> = {
  60: "WhatsApp Image 2026-10-16 at 12.03.31.jpeg",
  61: "WhatsApp Image 2026-10-16 at 12.05.15.jpeg",
  62: "WhatsApp Image 2026-10-16 at 12.05.16.jpeg",
  63: "WhatsApp Image 2026-10-16 at 12.05.16 (1).jpeg",
};

export const galleryPhotoSrc = (number: number) => {
  const additionalPhoto = ADDITIONAL_GALLERY_PHOTOS[number];
  if (additionalPhoto) return `/gallery/${encodeURIComponent(additionalPhoto)}`;
  return `/gallery/photo-${String(number).padStart(2, "0")}.jpeg`;
};

export const getGalleryBySlug = (slug: string) =>
  GALLERIES.find((gallery) => gallery.slug === slug);