"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

const authorisationIcons = ["✓", "🛡", "✓", "🛡", "✓", "🛡", "✓", "🛡", "✓"];

export default function Services() {
  const { lang, t } = useLanguage();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  const consultingItems = [
    {
      id: "consulting1",
      label: t("servicesConsultingItem1"),
      description: t("servicesConsultingItem1Desc"),
    },
    {
      id: "consulting2",
      label: t("servicesConsultingItem2"),
      description: t("servicesConsultingItem2Desc"),
    },
    {
      id: "consulting3",
      label: t("servicesConsultingItem3"),
      description: t("servicesConsultingItem3Desc"),
    },
  ];

  const projectItems = [
    {
      id: "project1",
      label: t("servicesProjectItem1"),
      description: t("servicesProjectItem1Desc"),
    },
    {
      id: "project2",
      label: t("servicesProjectItem2"),
      description: t("servicesProjectItem2Desc"),
    },
    {
      id: "project3",
      label: t("servicesProjectItem3"),
      description: t("servicesProjectItem3Desc"),
    },
  ];

  const authorisations = [
    t("auth1"),
    t("auth2"),
    t("auth3"),
    t("auth4"),
    t("auth5"),
    t("auth6"),
    t("auth7"),
    t("auth8"),
    t("auth9"),
  ];

  useEffect(() => {
    function closeServicePopups(event: MouseEvent | globalThis.MouseEvent) {
      if ((event.target as HTMLElement).closest(".service-item")) {
        return;
      }

      setActiveItem(null);
    }

    document.addEventListener("click", closeServicePopups);

    return () => document.removeEventListener("click", closeServicePopups);
  }, []);

  useEffect(() => {
    function updatePanelHeight() {
      setPanelHeight(panelRef.current?.scrollHeight ?? 0);
    }

    updatePanelHeight();
    window.addEventListener("resize", updatePanelHeight);

    return () => window.removeEventListener("resize", updatePanelHeight);
  }, [lang]);

  function handleServiceItemClick(
    event: MouseEvent<HTMLButtonElement>,
    itemId: string,
  ) {
    event.stopPropagation();
    setActiveItem((current) => (current === itemId ? null : itemId));
  }

  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title reveal">{t("servicesTitle")}</h2>

        <div className="service-grid">
          <article className="service-card reveal">
            <div className="service-icon-box">
              <span className="service-icon" aria-hidden="true">
                ❄
              </span>
            </div>
            <h3>{t("servicesConsultingTitle")}</h3>
            <ul>
              {consultingItems.map((item) => (
                <li
                  key={item.id}
                  className={`service-item${
                    activeItem === item.id ? " is-open" : ""
                  }`}
                >
                  <button
                    className="service-item-button"
                    type="button"
                    onClick={(event) => handleServiceItemClick(event, item.id)}
                  >
                    {item.label}
                  </button>
                  <div className="service-item-popup">
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="service-card reveal">
            <div className="service-icon-box">
              <span className="service-icon" aria-hidden="true">
                ⚙
              </span>
            </div>
            <h3>{t("servicesProjectTitle")}</h3>
            <ul>
              {projectItems.map((item) => (
                <li
                  key={item.id}
                  className={`service-item${
                    activeItem === item.id ? " is-open" : ""
                  }`}
                >
                  <button
                    className="service-item-button"
                    type="button"
                    onClick={(event) => handleServiceItemClick(event, item.id)}
                  >
                    {item.label}
                  </button>
                  <div className="service-item-popup">
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={`accordion reveal${isAccordionOpen ? " is-open" : ""}`}>
          <button
            className="accordion-toggle"
            type="button"
            aria-expanded={isAccordionOpen}
            aria-controls="authorisations-panel"
            onClick={() => setIsAccordionOpen((current) => !current)}
          >
            <span>{t("authBubble")}</span>
            <span className="accordion-arrow" aria-hidden="true">
              ▼
            </span>
          </button>
          <div
            ref={panelRef}
            className="accordion-panel"
            id="authorisations-panel"
            style={{ maxHeight: isAccordionOpen ? `${panelHeight}px` : "0px" }}
          >
            <div className="accordion-card">
              <ul className="auth-list">
                {authorisations.map((authorisation, index) => (
                  <li key={`${authorisation}-${index}`}>
                    <span className="auth-icon">{authorisationIcons[index]}</span>
                    <span>{authorisation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
