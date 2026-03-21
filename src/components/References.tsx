"use client";

import { useEffect, useRef, useState } from "react";
import FeatureCarousel from "@/components/ui/feature-carousel";
import { useLanguage } from "@/context/LanguageContext";

export default function References() {
  const { lang, t } = useLanguage();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  const experienceItems = [
    t("experience1"),
    t("experience2"),
    t("experience3"),
    t("experience4"),
    t("experience5"),
    t("experience6"),
    t("experience7"),
    t("experience8"),
    t("experience9"),
    t("experience10"),
    t("experience11"),
    t("experience12"),
    t("experience13"),
    t("experience14"),
    t("experience15"),
    t("experience16"),
    t("experience17"),
    t("experience18"),
    t("experience19"),
    t("experience20"),
    t("experience21"),
    t("experience22"),
    t("experience23"),
    t("experience24"),
    t("experience25"),
    t("experience26"),
    t("experience27"),
    t("experience28"),
    t("experience29"),
    t("experience30"),
    t("experience31"),
    t("experience32"),
    t("experience33"),
    t("experience34"),
  ];

  useEffect(() => {
    function updatePanelHeight() {
      setPanelHeight(panelRef.current?.scrollHeight ?? 0);
    }

    updatePanelHeight();
    window.addEventListener("resize", updatePanelHeight);

    return () => window.removeEventListener("resize", updatePanelHeight);
  }, [lang]);

  return (
    <section id="references" className="section">
      <div className="container">
        <h2 className="section-title reveal">{t("referencesTitle")}</h2>

        <h3 className="subsection-title reveal">
          {t("referencesProjectsFrom2017")}
        </h3>
        <FeatureCarousel />

        <div className={`accordion reveal${isAccordionOpen ? " is-open" : ""}`}>
          <button
            className="accordion-toggle"
            type="button"
            aria-expanded={isAccordionOpen}
            aria-controls="experience-panel"
            onClick={() => setIsAccordionOpen((current) => !current)}
          >
            <span>{t("referencesExperienceBubble")}</span>
            <span className="accordion-arrow" aria-hidden="true">
              ▼
            </span>
          </button>
          <div
            ref={panelRef}
            className="accordion-panel"
            id="experience-panel"
            style={{ maxHeight: isAccordionOpen ? `${panelHeight}px` : "0px" }}
          >
            <div className="accordion-card">
              <ul className="experience-list">
                {experienceItems.map((experience, index) => (
                  <li key={`${experience}-${index}`}>{experience}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
