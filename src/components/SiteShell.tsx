"use client";

import { type ReactNode, useEffect } from "react";
import Contact from "@/components/Contact";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import References from "@/components/References";
import Services from "@/components/Services";

type SiteShellProps = {
  hero: ReactNode;
};

export default function SiteShell({ hero }: SiteShellProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      {hero}
      <div className="section-divider divider-hero-services" aria-hidden="true" />
      <Services />
      <div
        className="section-divider divider-services-references"
        aria-hidden="true"
      />
      <References />
      <div
        className="section-divider divider-references-contact"
        aria-hidden="true"
      />
      <Contact />
      <div className="section-divider divider-contact-footer" aria-hidden="true" />
      <Footer />
      <CookieBanner />
    </>
  );
}
