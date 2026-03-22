"use client";

import FeatureCarousel from "@/components/ui/feature-carousel";
import { useLanguage } from "@/context/LanguageContext";

export default function References() {
  const { t } = useLanguage();

  return (
    <section id="references" className="section">
      <div className="container">
        <h2 className="section-title reveal">{t("referencesTitle")}</h2>

        <h3 className="subsection-title reveal">
          {t("referencesProjectsFrom2017")}
        </h3>
        <div className="reveal">
          <FeatureCarousel />
        </div>

        <details className="auth-accordion reveal">
          <summary className="auth-accordion-toggle">
            <span data-i18n="referencesExperienceBubble">
              {t("referencesExperienceBubble")}
            </span>
            <span className="auth-accordion-arrow">▼</span>
          </summary>
          <div className="auth-accordion-content">
            <ul>
              <li>Slovak Philharmonic - Reduta</li>
              <li>Social insurance company Poprad</li>
              <li>Slovak Technical University Trnava</li>
              <li>Minebea</li>
              <li>State tangible reserves administration</li>
              <li>Polyfunctional object Dunajská</li>
              <li>Polyfunctional object Rozadol</li>
              <li>Aupark Tower Bratislava</li>
              <li>Apollo Business Center II Bratislava</li>
              <li>Logistic center Svätý Jur</li>
              <li>Logistic center Malý Šariš</li>
              <li>
                Polyfunctional object - manufacture and warehouse Rača -
                Administrative building
              </li>
              <li>Gdanski Business Center I Warsaw, PL</li>
              <li>Aupark Tower Košice</li>
              <li>Logistic center Lovosice, CZ</li>
              <li>River Garden Office I Praha, CZ</li>
              <li>Vaci Corner Offices Budapest, HU</li>
              <li>Metronom Business Center Praha, CZ</li>
              <li>Postepu 14 Warsaw, PL</li>
              <li>Gdanski Business Center II Warsaw, PL</li>
              <li>33 Central, London, UK</li>
              <li>Aupark Shopping center, Hradec Králové, CZ</li>
              <li>Twin City, Bratislava</li>
              <li>West Station I-II, Warsaw, PL</li>
              <li>Parking house Aupark</li>
              <li>Aupark Foodcourt</li>
              <li>Aupark Piešťany</li>
              <li>Aupark Žilina</li>
              <li>City Business Center III-V</li>
              <li>Aupark Košice</li>
              <li>Logistic center Mošnov, CZ</li>
              <li>River Garden II, III Praha, CZ</li>
              <li>Konstruktorska Business Center Warsaw, PL</li>
              <li>Forum Business Center I Bratislava</li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}
