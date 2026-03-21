"use client";

import { useEffect, useRef, useState } from "react";
import { Building2 } from "lucide-react";
import {
  useLanguage,
  type StringTranslationKey,
} from "@/context/LanguageContext";

export type CarouselEntry = {
  id: string;
  label: string;
  translationKey?: StringTranslationKey;
  src?: string;
  type: "image" | "text";
  isPlaceholder?: boolean;
};

type FeatureCarouselProps = {
  entries: CarouselEntry[];
};

export default function FeatureCarousel({ entries }: FeatureCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (entries.length < 2 || isHovered) {
      return;
    }

    const autoScrollTimer = window.setInterval(() => {
      setCurrentIndex((current) => {
        const nextIndex = current === entries.length - 1 ? 0 : current + 1;
        scrollTrackToIndex(nextIndex);
        return nextIndex;
      });
    }, 4000);

    return () => window.clearInterval(autoScrollTimer);
  }, [entries.length, isHovered]);

  useEffect(() => {
    setCurrentIndex((current) =>
      Math.max(0, Math.min(current, entries.length - 1)),
    );
  }, [entries.length]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  function scrollTrackToIndex(index: number) {
    const track = trackRef.current;
    const card = cardRefs.current[index];

    if (!track || !card) {
      return;
    }

    track.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  }

  function scrollToIndex(index: number) {
    scrollTrackToIndex(index);
    window.setTimeout(() => {
      setCurrentIndex(index);
    }, 280);
  }

  function handleScroll() {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const closestIndex = cardRefs.current.reduce(
        (closest, card, index) => {
          if (!card) {
            return closest;
          }

          const distance = Math.abs(card.offsetLeft - track.scrollLeft);

          if (distance < closest.distance) {
            return { index, distance };
          }

          return closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;

      setCurrentIndex(closestIndex);
    }, 120);
  }

  return (
    <div
      className="projects-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-header">
        <button
          className="carousel-button carousel-button--prev"
          type="button"
          aria-label="Previous project"
          disabled={currentIndex === 0}
          onClick={() => {
            if (currentIndex === 0) {
              return;
            }

            scrollToIndex(currentIndex - 1);
          }}
        >
          ←
        </button>
        <button
          className="carousel-button carousel-button--next"
          type="button"
          aria-label="Next project"
          disabled={currentIndex === entries.length - 1}
          onClick={() => {
            if (currentIndex === entries.length - 1) {
              return;
            }

            scrollToIndex(currentIndex + 1);
          }}
        >
          →
        </button>
      </div>

      <div ref={trackRef} className="carousel-track" onScroll={handleScroll}>
        {entries.map((entry, index) => {
          const label = entry.translationKey ? t(entry.translationKey) : entry.label;

          if (entry.type === "image" && entry.src) {
            return (
              <article
                key={entry.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="project-card reveal"
              >
                <div className="project-card-image">
                  <img src={entry.src} loading="lazy" alt={label} />
                </div>
                <span className="project-card-title">{label}</span>
              </article>
            );
          }

          return (
            <article
              key={entry.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`project-text-card reveal${
                entry.isPlaceholder ? " project-text-card--placeholder" : ""
              }`}
            >
              {entry.isPlaceholder ? (
                <div className="project-placeholder-inner">
                  <Building2 className="project-placeholder-icon" />
                  <h4>{label}</h4>
                </div>
              ) : (
                <h4>{label}</h4>
              )}
            </article>
          );
        })}
      </div>

      <div className="carousel-dots" aria-label="Project carousel pagination">
        {entries.map((entry, index) => {
          const label = entry.translationKey ? t(entry.translationKey) : entry.label;

          return (
            <button
              key={`${entry.id}-dot`}
              type="button"
              className={`carousel-dot${currentIndex === index ? " active" : ""}`}
              aria-label={`Go to ${label}`}
              onClick={() => scrollToIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
