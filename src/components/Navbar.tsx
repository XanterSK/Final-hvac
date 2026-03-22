"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";

const sectionIds = ["home", "services", "references", "contact"] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
    window.addEventListener("resize", handleResize);
    sections.forEach((section) => observer.observe(section));

    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      hasScrolledRef.current = true;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      className={`site-nav transition-transform duration-300 ease-in-out ${
        isScrolled
          ? "bg-[rgba(10,22,40,0.9)] backdrop-blur-md border-b border-white/8"
          : "bg-transparent border-transparent"
      }`}
      aria-label="Primary"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
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
