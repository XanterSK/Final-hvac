"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { ComesInGoesOutUnderline } from "@/components/ui/underline-animation";

const sectionIds = ["home", "services", "references", "contact"] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>("home");
  const [heroNavVisible, setHeroNavVisible] = useState(false);
  const [heroRunwayComplete, setHeroRunwayComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const hasScrolledRef = useRef(false);
  const navLinksRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const shouldShowNavbar = heroRunwayComplete ? heroNavVisible && isVisible : heroNavVisible;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const handleHeroIntroState = (
      event: CustomEvent<{ navbarVisible: boolean; runwayComplete: boolean }>,
    ) => {
      setHeroNavVisible(event.detail.navbarVisible);
      setHeroRunwayComplete(event.detail.runwayComplete);
    };

    window.addEventListener(
      "hero-intro-state",
      handleHeroIntroState as EventListener,
    );

    return () => {
      window.removeEventListener(
        "hero-intro-state",
        handleHeroIntroState as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      hasScrolledRef.current = true;

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

  const navItems = [
    { id: "home", label: t("navHome") },
    { id: "services", label: t("navServices") },
    { id: "references", label: t("navReferences") },
    { id: "contact", label: t("navContact") },
  ] as const;

  return (
    <nav
      className={`site-nav transition-transform duration-300 ease-in-out ${
        heroRunwayComplete
          ? "bg-[rgba(10,10,8,0.92)] backdrop-blur-md border-b border-[rgba(184,151,90,0.15)]"
          : "bg-transparent border-transparent"
      }`}
      aria-label="Primary"
      style={{
        transform: shouldShowNavbar ? "translateY(0)" : "translateY(-100%)",
        opacity: shouldShowNavbar ? 1 : 0,
        pointerEvents: shouldShowNavbar ? "auto" : "none",
        zIndex: 999,
        transition:
          "transform 0.3s ease, opacity 0.45s ease, background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
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
          {navItems.map((item) => (
            <li key={item.id}>
              <ComesInGoesOutUnderline
                href={`#${item.id}`}
                direction="left"
                active={activeSection === item.id}
                onClick={handleNavClick}
                className="nav-underline-link"
                underlineClassName="bg-[#b8975a]"
              >
                {item.label}
              </ComesInGoesOutUnderline>
            </li>
          ))}
          <li className="mobile-lang-row">
            <hr className="mobile-lang-divider" />
            <div
              className="mobile-lang-switch"
              role="group"
              aria-label="Language switcher"
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
          </li>
        </ul>

        <div className="lang-switch" role="group" aria-label="Language switcher">
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
