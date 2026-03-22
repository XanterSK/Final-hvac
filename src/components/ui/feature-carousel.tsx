"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "nivy-tower",
    label: "Nivy Tower",
    image: "/photos/nivyTower-1366x2048.jpg",
    description: "Residential and commercial tower, Bratislava",
  },
  {
    id: "vydrica",
    label: "Vydrica",
    image: "/photos/vydrica.jpg",
    description: "Bratislava suburb residential development",
  },
  {
    id: "guthaus",
    label: "Guthaus",
    image: "/photos/guthaus.png",
    description: "Premium residential complex, Bratislava",
  },
  {
    id: "nivy-mall",
    label: "Nivy Mall",
    image: "/photos/Stanica_Nivy_1-1-1024x768.webp",
    description: "Major commercial hub, Bratislava",
  },
  {
    id: "einpark",
    label: "Einpark",
    image: "/photos/einpark2.jpg",
    description: "Residence and administrative building",
  },
  {
    id: "blumental",
    label: "Blumental",
    image: "/photos/blumental1.jpg",
    description: "Residence and administrative building, Bratislava",
  },
  {
    id: "new-apollo",
    label: "New Apollo",
    image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg",
    description: "Modern office building, Bratislava",
  },
  {
    id: "stengl",
    label: "Stengl Campus",
    image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg",
    description: "Campus development, Bratislava",
  },
  {
    id: "kolisky",
    label: "BD Kolísky",
    image: "/photos/sebolichy.sk:en:portfolio-item:kolisky-zahorska-bystrica:.jpg.jpg",
    description: "Award-winning residential complex, Bratislava",
  },
  {
    id: "volkswagen",
    label: "Volkswagen LOZ III",
    image: "/photos/Logistics center LOZ III – Volkswagen Bratislava.jpg",
    description: "Logistics center, Volkswagen Bratislava",
  },
];

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  useEffect(() => {
    FEATURES.forEach((feature) => {
      const image = new window.Image();
      image.src = feature.image;
    });
  }, []);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

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
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-transparent lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video">
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-[#0d1f3c] ">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
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
                        ? "bg-[#1a56db] text-white border-[#1a56db] z-10"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
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

        <div className="relative flex-1 min-h-[500px] overflow-hidden border-t border-white/8 bg-[#111f38] px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-t-0 lg:border-l lg:px-10 lg:py-16 flex items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
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
                  className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 border-white/8 bg-[#1a2f4a] transform-gpu md:rounded-[2.8rem] md:border-8"
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
