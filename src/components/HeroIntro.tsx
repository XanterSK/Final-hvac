"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";

const TEXT = "#f0ece4";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function rangeProgress(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function quoteOpacity(value: number, start: number, end: number) {
  if (value < start || value > end) {
    return 0;
  }

  const local = rangeProgress(value, start, end);

  if (local <= 0.22) {
    return local / 0.22;
  }

  if (local >= 0.78) {
    return (1 - local) / 0.22;
  }

  return 1;
}

function quoteTranslateY(value: number, start: number, end: number) {
  if (value < start || value > end) {
    return 28;
  }

  const local = rangeProgress(value, start, end);

  if (local <= 0.22) {
    return (1 - local / 0.22) * 22;
  }

  if (local >= 0.78) {
    return -((local - 0.78) / 0.22) * 22;
  }

  return 0;
}

export default function HeroIntro() {
  const { lang, setLang, t } = useLanguage();
  const runwayRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);

    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    const dispatchNavbarState = (navbarVisible: boolean, runwayComplete: boolean) => {
      window.dispatchEvent(
        new CustomEvent("hero-intro-state", {
          detail: { navbarVisible, runwayComplete },
        }),
      );
    };

    const updateProgress = () => {
      frameRef.current = null;

      const runway = runwayRef.current;
      if (!runway) return;

      const scrollDistance = Math.max(
        runway.offsetHeight - window.innerHeight,
        1,
      );
      const rawProgress = window.scrollY / scrollDistance;
      const clampedProgress = clamp(rawProgress);

      if (Math.abs(progressRef.current - clampedProgress) > 0.002) {
        progressRef.current = clampedProgress;
        setProgress(clampedProgress);
      }

      dispatchNavbarState(clampedProgress >= 0.78, rawProgress >= 1);

      const video = videoRef.current;
      if (
        !isMobile &&
        video &&
        video.readyState >= 2 &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const nextTime = clampedProgress * video.duration;
        if (Math.abs(video.currentTime - nextTime) > 0.06) {
          try {
            video.currentTime = Math.min(nextTime, video.duration - 0.05);
          } catch {
            // Ignore seek errors while metadata is still settling.
          }
        }
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    const handleVideoReady = () => {
      if (!videoRef.current) return;
      videoRef.current.pause();
      requestUpdate();
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    if (!isMobile) {
      videoRef.current?.addEventListener("loadedmetadata", handleVideoReady);
      videoRef.current?.addEventListener("loadeddata", handleVideoReady);
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      const video = videoRef.current;
      if (!isMobile && video) {
        video.removeEventListener("loadedmetadata", handleVideoReady);
        video.removeEventListener("loadeddata", handleVideoReady);
      }

      dispatchNavbarState(false, false);
    };
  }, [isMobile]);

  // Video and sequence logic
  const videoOpacity = 0.55 * rangeProgress(progress, 0.08, 0.18);
  const introQuotes = t("heroQuotePhrases").slice(1, 3);
  const quoteWindows: Array<[number, number]> = [
    [0.18, 0.43],
    [0.46, 0.71],
  ];
  const companyReveal = rangeProgress(progress, 0.72, 0.9);
  const introLanguageVisible = progress < 0.78;

  function handleLanguageChange(nextLanguage: Language) {
    setLang(nextLanguage);
  }

  return (
    <section
      ref={runwayRef}
      id="home"
      style={{
        minHeight: "760vh",
        background: "#000",
        paddingTop: 0,
        overflow: "visible",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          minHeight: "100svh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {isMobile || videoFailed ? (
          <img
            src="/video/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoOpacity,
              transform: "translateZ(0) scale(1.02)",
              willChange: "opacity, transform",
            }}
          />
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/video/hero-poster.jpg"
            src="/video/hero.mp4"
            onError={() => setVideoFailed(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoOpacity,
              transform: "translateZ(0) scale(1.02)",
              willChange: "opacity, transform",
            }}
          />
        )}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1.35rem",
              right: "1.35rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.45rem 0.65rem",
              border: "1px solid rgba(184,151,90,0.2)",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.28)",
              backdropFilter: "blur(8px)",
              zIndex: 15,
              opacity: introLanguageVisible ? 1 : 0,
              pointerEvents: introLanguageVisible ? "auto" : "none",
              transition: "opacity 0.25s ease",
            }}
            role="group"
            aria-label={t("navLanguageAria")}
          >
            <button
              type="button"
              className={`lang-link${lang === "en" ? " active" : ""}`}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </button>
            <span aria-hidden="true" className="lang-separator">
              |
            </span>
            <button
              type="button"
              className={`lang-link${lang === "sk" ? " active" : ""}`}
              onClick={() => handleLanguageChange("sk")}
            >
              SK
            </button>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {introQuotes.map((quote, index) => {
              const [start, end] = quoteWindows[index];
              const opacity = quoteOpacity(progress, start, end);
              const translateY = quoteTranslateY(progress, start, end);

              return (
                <p
                  key={quote}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "min(820px, calc(100% - 3rem))",
                    margin: 0,
                    color: TEXT,
                    opacity,
                    transform: `translate(-50%, calc(-50% + ${translateY}px))`,
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    fontFamily: 'var(--font-bebas), "Arial Narrow", sans-serif',
                    fontSize: "clamp(2.4rem, 6vw, 5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    textShadow: "0 10px 35px rgba(0, 0, 0, 0.65)",
                  }}
                >
                  {quote}
                </p>
              );
            })}

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: "grid",
                justifyItems: "center",
                gap: "0.75rem",
                opacity: companyReveal,
                transform: `translate(-50%, calc(-50% + ${(1 - companyReveal) * 28}px))`,
                transition: "opacity 0.45s ease, transform 0.45s ease",
                width: "min(1100px, calc(100% - 3rem))",
              }}
            >
              <h1
                style={{
                  color: TEXT,
                  fontFamily: 'var(--font-bebas), "Arial Narrow", sans-serif',
                  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                  fontWeight: 400,
                  letterSpacing: "0.16em",
                  lineHeight: 1.02,
                  textTransform: "uppercase",
                  paddingLeft: "0.16em",
                  textShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {t("heroTitleSuffix")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
