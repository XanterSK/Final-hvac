"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2 } from "lucide-react";
import { useLanguage, type Language } from "@/context/LanguageContext";

const AUTO_PLAY_INTERVAL = 5000;

type LocalizedCopy = {
  en: string;
  sk: string;
};

type Feature = {
  id: string;
  image: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
};

function sameCopy(value: string): LocalizedCopy {
  return {
    en: value,
    sk: value,
  };
}

const FEATURES: Feature[] = [
  {
    id: "nivy-tower",
    image: "/photos/nivyTower-1366x2048.jpg",
    title: sameCopy("Nivy Tower"),
    description: sameCopy("Residential and commercial tower, Bratislava"),
  },
  {
    id: "vydrica",
    image: "/photos/vydrica.jpg",
    title: sameCopy("Vydrica"),
    description: sameCopy("Bratislava suburb residential development"),
  },
  {
    id: "guthaus-png",
    image: "/photos/guthaus.png",
    title: sameCopy("Guthaus"),
    description: sameCopy("Premium residential complex, Bratislava"),
  },
  {
    id: "guthaus-jpg",
    image: "/photos/guthaus.jpg",
    title: sameCopy("Guthaus"),
    description: sameCopy("Premium residential complex, Bratislava"),
  },
  {
    id: "nivy-mall",
    image: "/photos/Stanica_Nivy_1-1-1024x768.webp",
    title: sameCopy("Nivy Mall Bratislava"),
    description: sameCopy("Major commercial and transport hub, Bratislava"),
  },
  {
    id: "einpark",
    image: "/photos/einpark2.jpg",
    title: sameCopy("Einpark"),
    description: sameCopy("Residence and administrative building, Bratislava"),
  },
  {
    id: "blumental",
    image: "/photos/blumental1.jpg",
    title: sameCopy("Blumental"),
    description: sameCopy("Residence and administrative building, Bratislava"),
  },
  {
    id: "new-apollo",
    image:
      "/photos/Kvartet%20(Ljubljana)%20%E2%80%93%20rezidence%20%C2%B7%20New%20Apollo%20%C2%B7%20Stengl%20Campus.jpg",
    title: sameCopy("New Apollo"),
    description: sameCopy("Modern office building, Bratislava"),
  },
  {
    id: "stengl-campus",
    image:
      "/photos/Kvartet%20(Ljubljana)%20%E2%80%93%20rezidence%20%C2%B7%20New%20Apollo%20%C2%B7%20Stengl%20Campus.jpg",
    title: sameCopy("Stengl Campus"),
    description: sameCopy("Campus development, Bratislava"),
  },
  {
    id: "bd-kolisky",
    image:
      "/photos/sebolichy.sk%3Aen%3Aportfolio-item%3Akolisky-zahorska-bystrica%3A.jpg.jpg",
    title: sameCopy("BD Kolísky"),
    description: sameCopy("Award-winning residential complex, Bratislava"),
  },
  {
    id: "volkswagen-loz-iii",
    image:
      "/photos/Logistics%20center%20LOZ%20III%20%E2%80%93%20Volkswagen%20Bratislava.jpg",
    title: sameCopy("Volkswagen LOZ III"),
    description: sameCopy("Logistics center, Volkswagen Bratislava"),
  },
];

function getCopy(value: LocalizedCopy, lang: Language) {
  return value[lang];
}

export default function FeatureCarousel() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeFeature = FEATURES[activeIndex];

  useEffect(() => {
    if (isPaused || FEATURES.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % FEATURES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const visibleStack = useMemo(() => {
    const nextIndex = (activeIndex + 1) % FEATURES.length;
    const thirdIndex = (activeIndex + 2) % FEATURES.length;

    return [FEATURES[nextIndex], FEATURES[thirdIndex]];
  }, [activeIndex]);

  function handleChipClick(index: number) {
    setActiveIndex(index);
  }

  return (
    <div
      className="reveal relative overflow-hidden rounded-[28px] border border-[#dbe3ef] bg-white shadow-[0_24px_70px_rgba(13,31,60,0.12)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="relative overflow-hidden bg-[#0d1f3c] px-5 py-6 sm:px-6 sm:py-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent" />

          <div className="relative z-10 mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              HVAC &amp; BMS
            </p>
            <h4 className="mt-2 text-xl font-semibold leading-tight text-white">
              Project References
            </h4>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {FEATURES.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleChipClick(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#1a56db] bg-[#1a56db] text-white shadow-[0_18px_38px_rgba(26,86,219,0.35)]"
                      : "border-[rgba(255,255,255,0.2)] bg-white/0 text-[rgba(255,255,255,0.6)] hover:border-white/40 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-white/20 bg-white/12"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Building2 size={18} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold sm:text-[0.95rem]">
                      {getCopy(feature.title, lang)}
                    </span>
                    <span
                      className={`mt-1 block truncate text-xs ${
                        isActive ? "text-white/80" : "text-white/35"
                      }`}
                    >
                      {getCopy(feature.description, lang)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden bg-[#f8fafc] p-4 sm:min-h-[560px] sm:p-6">
          <div className="pointer-events-none absolute inset-x-4 top-4 hidden h-[86%] rounded-[28px] border border-[#dbe3ef] bg-white/40 sm:block" />
          <div className="pointer-events-none absolute inset-x-6 top-8 hidden h-[82%] rounded-[28px] border border-[#dbe3ef] bg-white/20 sm:block" />

          <AnimatePresence mode="wait">
            <motion.article
              key={activeFeature.id}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -28, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 h-full min-h-[448px] overflow-hidden rounded-[28px] border border-[#dbe3ef] bg-[#0a1628] shadow-[0_28px_80px_rgba(10,22,40,0.22)] sm:min-h-[512px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeFeature.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/18 via-[#0a1628]/28 to-[#0a1628]/92" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center rounded-full bg-[#1a56db] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-[0.72rem]">
                    Featured Project
                  </span>
                  <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/75 sm:flex">
                    <Building2 size={18} strokeWidth={2} />
                    <span>{activeIndex + 1}/{FEATURES.length}</span>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <motion.h4
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 }}
                    className="text-3xl font-semibold leading-tight text-white sm:text-5xl"
                  >
                    {getCopy(activeFeature.title, lang)}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.18 }}
                    className="mt-4 max-w-xl text-sm leading-7 text-white/82 sm:text-base"
                  >
                    {getCopy(activeFeature.description, lang)}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-6 right-6 left-6 z-20 hidden gap-3 lg:flex">
            {visibleStack.map((feature, index) => (
              <motion.div
                key={`${feature.id}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
                className="min-h-[110px] flex-1 overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-2 text-white/78">
                  <Building2 size={18} strokeWidth={2} />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Up Next
                  </span>
                </div>
                <p className="text-base font-semibold text-white">
                  {getCopy(feature.title, lang)}
                </p>
                <p className="mt-1 text-sm text-white/66">
                  {getCopy(feature.description, lang)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
