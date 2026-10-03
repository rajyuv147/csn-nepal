"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui";

const SLIDES = [
  {
    image: "https://www.csnnepal.org.np/gallery/photo-17.jpeg",
    alt: "CSN flood response team in Bhotekoshi",
    eyebrow: "Emergency Response",
    title: "Bhotekoshi Flood Response",
    description:
      "CSN is on the ground in Nuwakot and Rasuwa — delivering child protection, relief assistance, WASH support and livelihood recovery to flood-affected communities.",
    primaryCta: { label: "Support the response", href: "/donate" },
    secondaryCta: { label: "Who we are", href: "/about" },
  },
  {
    image: "https://www.csnnepal.org.np/gallery/photo-24.jpeg",
    alt: "Children learning in a CSN child-friendly space",
    eyebrow: "Child Protection",
    title: "Every child deserves a safe space to learn",
    description:
      "From child-friendly spaces to education support, CSN ensures children in Nepal continue learning and growing — even in the hardest of circumstances.",
    primaryCta: { label: "Donate", href: "/donate" },
    secondaryCta: { label: "See projects", href: "/programs/projects" },
  },
  {
    image: "https://www.csnnepal.org.np/gallery/photo-36.jpeg",
    alt: "CSN community support in rural Nepal",
    eyebrow: "Community-Led Development",
    title: "Self-sustained villages, built together",
    description:
      "Co-operation Society Nepal works with remote and semi-urban communities on education, health, livelihood and disaster resilience — since 2013.",
    primaryCta: { label: "Get involved", href: "/contact" },
    secondaryCta: { label: "Our programs", href: "/programs" },
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (index: number) => setActive((index + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative w-full h-[85vh] md:h-[92vh] overflow-hidden bg-[#032e1a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#032e1a]/85 via-[#032e1a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032e1a]/60 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.image}
              className={`transition-all duration-700 ${
                i === active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 absolute pointer-events-none"
              }`}
            >
              <p className="inline-flex items-center gap-2 text-[13px] font-bold text-[#f6b231] uppercase tracking-wider">
                <span className="w-8 h-[3px] rounded-full bg-[#f6b231] inline-block" />
                {slide.eyebrow}
              </p>
              <h1 className="font-display font-semibold text-4xl md:text-6xl text-white leading-[1.05] mt-4">
                {slide.title}
              </h1>
              <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-xl">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="sun">
                  <Link href={slide.primaryCta.href}>
                    {slide.primaryCta.label} <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="!bg-white/10 !text-white !border-white/25 backdrop-blur-sm hover:!bg-white/20"
                >
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-[#f6b231]" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white grid place-items-center hover:bg-white/20 transition-colors"
            >
              <CaretLeft size={18} />
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white grid place-items-center hover:bg-white/20 transition-colors"
            >
              <CaretRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
