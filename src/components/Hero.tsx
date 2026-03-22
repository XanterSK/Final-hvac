"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, t } = useLanguage();
  const phrases = t("heroQuotePhrases");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [quoteState, setQuoteState] = useState<"entering" | "leaving">(
    "entering",
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhraseIndex(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuoteState("entering");
  }, [lang]);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setQuoteState("leaving");
    }, 4000);

    const swapTimer = window.setTimeout(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
      setQuoteState("entering");
    }, 4500);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(swapTimer);
    };
  }, [phraseIndex, phrases]);

  return (
    <section id="home">
      <div className="hero-images" aria-hidden="true">
        <div className="hero-image">
          <img src="/photos/nivyTower-1366x2048.jpg" loading="lazy" alt="" />
        </div>
        <div className="hero-image">
          <img src="/photos/vydrica.jpg" loading="lazy" alt="" />
        </div>
        <div className="hero-image">
          <img
            src="/photos/Stanica_Nivy_1-1-1024x768.webp"
            loading="lazy"
            alt=""
          />
        </div>
      </div>

      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-heading">
            <span className="hero-heading-prefix">{t("heroTitlePrefix")}</span>
            <span className="hero-heading-nowrap">{t("heroTitleSuffix")}</span>
          </h1>
          <p className="hero-quote" aria-live="polite">
            <span className={`hero-quote-text is-${quoteState}`}>
              {phrases[phraseIndex]}
            </span>
          </p>
          <a className="cta-btn" href="#services">
            {t("heroCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
