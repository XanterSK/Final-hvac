"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";

const sectionIds = ["home", "services", "references", "contact"] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const hasScrolledRef = useRef(false);
  const navLinksRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setActiveSection("home");
    hasScrolledRef.current = false;

    function closeOnOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (
        navLinksRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    }

    function updateScrollState() {
      setIsScrolled(window.scrollY > 60);
    }

    function markScrolled() {
      hasScrolledRef.current = true;
    }

    function handleResize() {
      if (window.innerWidth >= 980) {
        setIsOpen(false);
      }
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !hasScrolledRef.current) {
            return;
          }

          setActiveSection(entry.target.id as (typeof sectionIds)[number]);
        });
      },
      {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px",
      },
    );

    document.addEventListener("click", closeOnOutsideClick);
    window.addEventListener("scroll", markScrolled, { once: true });
    window.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", handleResize);
    sections.forEach((section) => observer.observe(section));
    updateScrollState();

    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      window.removeEventListener("scroll", markScrolled);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  function handleNavClick() {
    if (window.innerWidth < 980) {
      setIsOpen(false);
    }
  }

  function handleLanguageChange(nextLanguage: Language) {
    setLang(nextLanguage);

    if (window.innerWidth <= 980 && isOpen) {
      setIsOpen(false);
    }
  }

  return (
    <nav
      className="site-nav"
      aria-label="Primary"
      style={{
        boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        borderBottomColor: isScrolled
          ? "rgba(203,213,225,0.25)"
          : "rgba(203,213,225,0.14)",
      }}
    >
      <div className="container nav-inner">
        <a className="nav-brand" href="#home" onClick={handleNavClick}>
          <img src="/HVAC-and-BMS-logo-transparent.png" alt="HVAC & BMS" />
        </a>

        <ul
          ref={navLinksRef}
          className={`nav-links${isOpen ? " open" : ""}`}
          id="nav-links"
        >
          <li>
            <a
              href="#home"
              className={activeSection === "home" ? "active" : undefined}
              onClick={handleNavClick}
            >
              {t("navHome")}
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={activeSection === "services" ? "active" : undefined}
              onClick={handleNavClick}
            >
              {t("navServices")}
            </a>
          </li>
          <li>
            <a
              href="#references"
              className={activeSection === "references" ? "active" : undefined}
              onClick={handleNavClick}
            >
              {t("navReferences")}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === "contact" ? "active" : undefined}
              onClick={handleNavClick}
            >
              {t("navContact")}
            </a>
          </li>
          <li className="mobile-lang-row">
            <hr className="mobile-lang-divider" />
            <div
              className="mobile-lang-switch"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                className={`lang-btn${lang === "en" ? " active" : ""}`}
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn${lang === "sk" ? " active" : ""}`}
                onClick={() => handleLanguageChange("sk")}
              >
                SK
              </button>
            </div>
          </li>
        </ul>

        <div className="lang-switch" role="group" aria-label="Language switcher">
          <button
            type="button"
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`lang-btn${lang === "sk" ? " active" : ""}`}
            onClick={() => handleLanguageChange("sk")}
          >
            SK
          </button>
        </div>

        <button
          ref={hamburgerRef}
          className="hamburger"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="nav-links"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
