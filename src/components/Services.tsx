"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, Lightbulb, Settings, Wrench, Building2, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const consultingItems = [
    { id: "consulting1", label: t("servicesConsultingItem1"), description: t("servicesConsultingItem1Desc"), icon: Briefcase },
    { id: "consulting2", label: t("servicesConsultingItem2"), description: t("servicesConsultingItem2Desc"), icon: Lightbulb },
    { id: "consulting3", label: t("servicesConsultingItem3"), description: t("servicesConsultingItem3Desc"), icon: Zap },
  ];

  const projectItems = [
    { id: "project1", label: t("servicesProjectItem1"), description: t("servicesProjectItem1Desc"), icon: Building2 },
    { id: "project2", label: t("servicesProjectItem2"), description: t("servicesProjectItem2Desc"), icon: Settings },
    { id: "project3", label: t("servicesProjectItem3"), description: t("servicesProjectItem3Desc"), icon: Wrench },
  ];

  const allServices = [
    ...consultingItems.map((item) => ({ ...item, category: t("servicesConsultingTitle") })),
    ...projectItems.map((item) => ({ ...item, category: t("servicesProjectTitle") })),
  ];

  useGSAP(
    () => {
      const triggers = gsap.utils.toArray<HTMLElement>(".service-text-block");

      // Pin the right side container to center perfectly
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      triggers.forEach((trigger, i) => {
        ScrollTrigger.create({
          trigger: trigger,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(visualsRef);
      gsap.fromTo(
        q(".morph-icon"),
        { opacity: 0, scale: 0.85, filter: "blur(4px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out", overwrite: true }
      );
    },
    [activeIndex]
  );

  const ActiveIcon = allServices[activeIndex]?.icon || Briefcase;

  return (
    <section id="services" className="relative bg-[var(--bg-secondary)] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 py-32 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Column (Text Blocks) */}
        <div className="w-full lg:w-1/2 lg:pr-12 relative z-20">
          <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] tracking-[0.1em] font-bebas leading-[1.1] text-[var(--text-primary)] sticky top-[var(--nav-height)] pt-8 pb-4 z-20 bg-[var(--bg-secondary)] uppercase">
            {t("servicesTitle")}
          </h2>

          <div className="mt-[15vh] pb-[60vh]">
            {allServices.map((service, i) => (
              <div
                key={service.id}
                className={`service-text-block min-h-[50vh] flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeIndex === i ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-4"
                }`}
              >
                <div className="text-[var(--accent)] font-bebas text-lg tracking-[0.15em] mb-4 uppercase">
                  {service.category}
                </div>
                <h3 className="text-3xl md:text-5xl font-bebas text-white mb-6 tracking-[0.05em] uppercase">
                  {service.label}
                </h3>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-[90%] leading-relaxed font-light">
                  {service.description}
                </p>
                
                {/* Mobile Visual */}
                <div className="lg:hidden mt-10 w-full aspect-square rounded-[2rem] border border-[rgba(184,151,90,0.15)] bg-[#0A0A08] flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(184,151,90,0.1)] to-transparent" />
                   <service.icon className="w-24 h-24 text-[var(--accent)] drop-shadow-[0_0_20px_rgba(184,151,90,0.6)]" strokeWidth={1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (ScrollTrigger Pinned Visual Box) */}
        <div className="hidden lg:flex w-1/2 absolute right-0 h-screen top-0 items-center justify-center pointer-events-none" ref={pinRef}>
          <div
            ref={visualsRef}
            className="w-[450px] h-[450px] rounded-full border border-[rgba(184,151,90,0.2)] bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.8),0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(184,151,90,0.08)] to-transparent" />
            
            {/* Absolute Centered Icon Wrapper */}
            <div className="morph-icon absolute inset-0 m-auto flex items-center justify-center text-[var(--accent)] drop-shadow-[0_0_40px_rgba(184,151,90,0.5)]">
              <ActiveIcon className="w-48 h-48" strokeWidth={0.75} />
            </div>
          </div>
        </div>

      </div>
      
      {/* Massive Dead Space to buffer the transition to References */}
      <div className="w-full h-40 md:h-64 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
