"use client";

import { useEffect } from "react";
import Contact from "@/components/Contact";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import References from "@/components/References";
import Services from "@/components/Services";
import type { CarouselEntry } from "@/components/ui/feature-carousel";

type SiteShellProps = {
  carouselEntries: CarouselEntry[];
};

export default function SiteShell({ carouselEntries }: SiteShellProps) {
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
      <Hero />
      <Services />
      <References carouselEntries={carouselEntries} />
      <Contact />
      <Footer />
      <CookieBanner />
    </>
  );
}
