"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export function ExperienceMarquee() {
  const { t } = useLanguage();
  const marqueeText = t("referencesExperienceTicker");

  return (
    <section className="relative z-30 overflow-hidden bg-[#0f0f0d] py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="border-t border-[rgba(184,151,90,0.15)] pt-8">
          <div
            className="experience-marquee"
            aria-label={t("referencesExperienceBubble")}
          >
            <div className="experience-marquee-track">
              <span className="experience-marquee-copy">{marqueeText}</span>
              <span className="experience-marquee-copy" aria-hidden="true">
                {marqueeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function References() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: "nivy-tower",
      label: t("projectNivyTower"),
      image: "/photos/nivy-tower-new.jpg",
    },
    {
      id: "vydrica",
      label: t("projectVydrica"),
      image: "/photos/vydrica-new.jpg",
    },
    {
      id: "guthaus",
      label: t("projectGuthaus"),
      image: "/photos/guthaus-current.jpg",
    },
    {
      id: "nivy-mall",
      label: t("projectNivyMall"),
      image: "/photos/nivy-mall-new.webp",
    },
    {
      id: "einpark",
      label: t("projectEinpark"),
      image: "/photos/einpark-new.jpg",
    },
    {
      id: "blumental",
      label: t("projectBlumental"),
      image: "/photos/blumental-new.png",
    },
    {
      id: "new-apollo",
      label: t("projectNewApollo"),
      image: "/photos/new-apollo.webp",
    },
    {
      id: "stengl",
      label: t("projectStenglCampus"),
      image: "/photos/stengl-campus.png",
    },
    {
      id: "kolisky",
      label: t("projectKolisky"),
      image: "/photos/db-kolisky.jpg",
    },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(bgRef);
      gsap.fromTo(
        q(".bg-image"),
        { opacity: 0, scale: 1 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        },
      );
    },
    [activeProject],
  );

  return (
    <section
      id="references"
      className="relative flex min-h-[110vh] flex-col justify-center overflow-hidden bg-[#000] py-40"
    >
      <div
        className="absolute inset-0 z-0 bg-black pointer-events-none"
        ref={bgRef}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute top-0 inset-x-0 z-20 h-[45vh] bg-gradient-to-b from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 z-10 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.9)]" />
          <Image
            key={activeProject}
            src={projects[activeProject].image}
            alt={projects[activeProject].label}
            fill
            sizes="100vw"
            quality={80}
            loading="lazy"
            className="bg-image object-cover object-center opacity-0"
          />
        </div>
      </div>

      <div className="container relative z-20 mx-auto mt-16 flex flex-1 flex-col px-4 lg:px-8">
        <div className="sticky top-32 max-w-[420px] w-full">
          <h2 className="mb-2 text-[clamp(1.75rem,4vw,3rem)] font-bebas uppercase leading-none tracking-[0.1em] text-[var(--accent)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            {t("referencesTitle")}
          </h2>
          <h3 className="mb-10 text-sm font-bebas uppercase tracking-widest text-white/80 drop-shadow-md">
            {t("referencesProjectsFrom2017")}
          </h3>

          <ul className="flex flex-col gap-3 border-l border-white/10 py-2 pl-6">
            {projects.map((project, index) => (
              <li key={project.id}>
                <button
                  className={`hover-hide relative py-1 text-left font-bebas text-3xl font-light tracking-[0.05em] transition-all duration-400 ease-out outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-4xl ${
                    activeProject === index
                      ? "translate-x-3 text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] before:absolute before:-left-[42px] before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-[var(--accent)] before:shadow-[0_0_10px_rgba(184,151,90,1)]"
                      : "text-white/40 hover:text-white/90"
                  }`}
                  onMouseEnter={() => setActiveProject(index)}
                  onClick={() => setActiveProject(index)}
                >
                  {project.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
