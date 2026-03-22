"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<string | null>(null);

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
        <h2 className="section-title reveal visible">{t("servicesTitle")}</h2>

        <div className="service-grid">
          <article className="service-card reveal">
            <div className="service-rule" aria-hidden="true" />
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
            <div className="service-rule" aria-hidden="true" />
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

        <details className="auth-accordion reveal">
          <summary className="auth-accordion-toggle">
            <span data-i18n="authBubble">{t("authBubble")}</span>
            <span className="auth-accordion-arrow">▼</span>
          </summary>
          <div className="auth-accordion-content">
            <ul>
              <li>
                Construction manager - Technical, technological and energy
                building equipment - electrical equipment
              </li>
              <li>Electrical engineer for work and operation management</li>
              <li>
                Construction manager - Technical, technological and energy
                building equipment - sanitary technical equipment and
                installations, heating and air conditioning equipment, heating
                equipment, gas equipment
              </li>
              <li>
                §24 Certificate 0005-IBA/2021 EZ RT E1A,B - In the range: E1B-
                technical equipment without voltage limitation, including
                lightning conductors in buildings with a risk of explosion
              </li>
              <li>§24 Certificate 1194/4/2008-EZ-E-E2-A</li>
              <li>
                Certificate for the engineering of specified technical
                electrical equipment according to EN ISO / IEC 17024-2012
              </li>
              <li>
                Operation of specified technical pressure equipment § 17 of
                Decree No. 508 Z.z. - boilers operation V. Class
              </li>
              <li>
                Certificate of professional qualification in heat-power
                engineering according to § 4 par. 4 of Act No. 657/2004 /
                44-1027
              </li>
              <li>
                Authorisation for installation and engineering - EPS and HSP
                Bosch, ESSER
              </li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}
