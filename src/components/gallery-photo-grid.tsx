"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, DownloadSimple, X } from "@phosphor-icons/react";

type GalleryPhoto = { src: string; alt: string };

export function GalleryPhotoGrid({ title, photos }: { title: string; photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % photos.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e7f3ec] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#01723b]"
            aria-label={`View ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="presentation"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex h-full max-h-[900px] w-full max-w-7xl flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${title}, photo ${activeIndex + 1} of ${photos.length}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 text-white">
              <p className="min-w-0 truncate text-sm font-medium sm:text-base">
                {title} <span className="text-white/60">/ {activeIndex + 1} of {photos.length}</span>
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={activePhoto.src}
                  download={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${activeIndex + 1}.jpeg`}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Download photo"
                  title="Download photo"
                >
                  <DownloadSimple size={21} />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Close photo viewer"
                  title="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
            {photos.length > 1 && (
              <div className="pointer-events-none absolute inset-y-1/2 left-0 right-0 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)}
                  className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Previous photo"
                  title="Previous photo"
                >
                  <CaretLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}
                  className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Next photo"
                  title="Next photo"
                >
                  <CaretRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}