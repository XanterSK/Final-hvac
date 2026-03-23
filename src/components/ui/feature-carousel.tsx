"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    {
      id: "nivy-tower",
      label: t("projectNivyTower"),
      image: "/photos/nivyTower-1366x2048.jpg",
    },
    {
      id: "vydrica",
      label: t("projectVydrica"),
      image: "/photos/vydrica.jpg",
    },
    {
      id: "guthaus",
      label: t("projectGuthaus"),
      image: "/photos/guthaus.png",
    },
    {
      id: "nivy-mall",
      label: t("projectNivyMall"),
      image: "/photos/Stanica_Nivy_1-1-1024x768.webp",
    },
    {
      id: "einpark",
      label: t("projectEinpark"),
      image: "/photos/einpark2.jpg",
    },
    {
      id: "blumental",
      label: t("projectBlumental"),
      image: "/photos/blumental1.jpg",
    },
    {
      id: "new-apollo",
      label: t("projectNewApollo"),
      image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg",
    },
    {
      id: "stengl",
      label: t("projectStenglCampus"),
      image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg",
    },
    {
      id: "kolisky",
      label: t("projectKolisky"),
      image: "/photos/sebolichy.sk:en:portfolio-item:kolisky-zahorska-bystrica:.jpg.jpg",
    },
    {
      id: "volkswagen",
      label: t("projectVolkswagenLoz"),
      image: "/photos/Logistics center LOZ III – Volkswagen Bratislava.jpg",
    },
  ];

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  useEffect(() => {
    features.forEach((feature) => {
      const image = new window.Image();
      image.src = feature.image;
    });
  }, [features]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto md:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-[rgba(184,151,90,0.14)] bg-transparent lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        <div className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-[#111110] px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
          <div className="absolute inset-x-0 top-0 z-40 h-12 bg-gradient-to-b from-[#111110] via-[#111110]/80 to-transparent md:h-20 lg:h-16" />
          <div className="absolute inset-x-0 bottom-0 z-40 h-12 bg-gradient-to-t from-[#111110] via-[#111110]/80 to-transparent md:h-20 lg:h-16" />
          <div className="relative w-full h-full flex items-center justify-center z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 78,
                    damping: 24,
                    mass: 1,
                  }}
                  className="absolute left-1/2 flex w-full max-w-[280px] -translate-x-1/2 transform-gpu items-center justify-center"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex h-[52px] w-full items-center justify-center rounded-full border px-6 text-center transition-all duration-700 md:h-[60px] md:px-8 lg:h-[56px]",
                      isActive
                        ? "z-10 border-[#b8975a] bg-transparent text-[#b8975a]"
                        : "border-[rgba(184,151,90,0.12)] bg-[#141412] text-[#f0ece4]/55 hover:border-[rgba(184,151,90,0.28)] hover:text-[#f0ece4]"
                    )}
                  >
                    <span className="block w-full text-center text-sm font-normal uppercase tracking-tight md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-[rgba(184,151,90,0.12)] bg-[#111110] px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-t-0 lg:border-l lg:px-10 lg:py-16">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 185,
                    damping: 28,
                    mass: 0.95,
                  }}
                  className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border border-[rgba(184,151,90,0.1)] bg-[#161613] transform-gpu md:rounded-[2.8rem]"
                  style={{ willChange: "transform, opacity" }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    loading={isActive ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
