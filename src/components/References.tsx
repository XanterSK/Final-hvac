"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const PROJECTS = [
  { id: "nivy-tower", label: "Nivy Tower", image: "/photos/nivyTower-1366x2048.jpg" },
  { id: "vydrica", label: "Vydrica", image: "/photos/vydrica.jpg" },
  { id: "guthaus", label: "Guthaus", image: "/photos/guthaus.jpg" },
  { id: "nivy-mall", label: "Nivy Mall", image: "/photos/Stanica_Nivy_1-1-1024x768.webp" },
  { id: "einpark", label: "Einpark", image: "/photos/einpark2.jpg" },
  { id: "blumental", label: "Blumental", image: "/photos/blumental1.jpg" },
  { id: "new-apollo", label: "New Apollo", image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg" },
  { id: "stengl", label: "Stengl Campus", image: "/photos/Kvartet (Ljubljana) – rezidence · New Apollo · Stengl Campus.jpg" },
  { id: "kolisky", label: "BD Kolísky", image: "/photos/sebolichy.sk:en:portfolio-item:kolisky-zahorska-bystrica:.jpg.jpg" },
  { id: "volkswagen", label: "Volkswagen LOZ III", image: "/photos/Logistics center LOZ III – Volkswagen Bratislava.jpg" },
];

const EXPERIENCES = [
  "Slovak Philharmonic - Reduta", "Social insurance company Poprad", "Slovak Technical University Trnava", "Minebea",
  "State tangible reserves administration", "Polyfunctional object Dunajská", "Polyfunctional object Rozadol",
  "Aupark Tower Bratislava", "Apollo Business Center II Bratislava", "Logistic center Svätý Jur", "Logistic center Malý Šariš",
  "Polyfunctional object - manufacture and warehouse Rača - Administrative building", "Gdanski Business Center I Warsaw, PL",
  "Aupark Tower Košice", "Logistic center Lovosice, CZ", "River Garden Office I Praha, CZ", "Vaci Corner Offices Budapest, HU",
  "Metronom Business Center Praha, CZ", "Postepu 14 Warsaw, PL", "Gdanski Business Center II Warsaw, PL", "33 Central, London, UK",
  "Aupark Shopping center, Hradec Králové, CZ", "Twin City, Bratislava", "West Station I-II, Warsaw, PL", "Parking house Aupark",
  "Aupark Foodcourt", "Aupark Piešťany", "Aupark Žilina", "City Business Center III-V", "Aupark Košice", "Logistic center Mošnov, CZ",
  "River Garden II, III Praha, CZ", "Konstruktorska Business Center Warsaw, PL", "Forum Business Center I Bratislava"
];

export default function References() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const [showExperiences, setShowExperiences] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  // Background Image Transitions
  useGSAP(() => {
    const q = gsap.utils.selector(bgRef);
    gsap.fromTo(
      q('.bg-image'),
      { opacity: 0, scale: 1 },
      { opacity: 1, scale: 1.05, duration: 0.5, ease: "power2.out", overwrite: true }
    );
  }, [activeProject]);

  // Past Experiences Stagger Animation
  useGSAP(() => {
    if (showExperiences && gridRef.current) {
      const items = gsap.utils.toArray(gridRef.current.children);
      gsap.fromTo(items, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power3.out" }
      );
    }
  }, [showExperiences]);

  return (
    <>
      <section id="references" className="relative min-h-[110vh] bg-[#000] py-40 overflow-hidden flex flex-col justify-center">
         <div className="absolute inset-0 z-0 bg-black pointer-events-none" ref={bgRef}>
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black via-black/60 to-transparent z-20 h-[45vh]" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.9)] z-10" />
            <Image 
              key={activeProject}
              src={PROJECTS[activeProject].image} 
              alt={PROJECTS[activeProject].label}
              fill
              sizes="100vw"
              priority
              className="bg-image object-cover object-center opacity-0"
            />
         </div>

         <div className="container relative z-20 mx-auto px-4 lg:px-8 mt-16 flex-1 flex flex-col">
           <div className="max-w-[420px] w-full sticky top-32">
             <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bebas tracking-[0.1em] text-[var(--accent)] mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none uppercase">
               {t("referencesTitle")}
             </h2>
             <h3 className="text-sm font-bebas text-white/80 tracking-widest uppercase mb-10 drop-shadow-md">
               {t("referencesProjectsFrom2017")}
             </h3>
             
             <ul className="flex flex-col gap-3 border-l border-white/10 pl-6 py-2">
             {PROJECTS.map((project, i) => (
                <li key={project.id}>
                  <button 
                    className={`hover-hide text-left font-bebas font-light tracking-[0.05em] text-3xl md:text-4xl transition-all duration-400 ease-out py-1 outline-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                      activeProject === i 
                        ? 'text-white translate-x-3 drop-shadow-[0_0_20px_rgba(0,0,0,1)] relative before:absolute before:-left-[42px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[var(--accent)] before:rounded-full before:shadow-[0_0_10px_rgba(184,151,90,1)]' 
                        : 'text-white/40 hover:text-white/90'
                    }`}
                    onMouseEnter={() => setActiveProject(i)}
                    onClick={() => setActiveProject(i)}
                  >
                    {project.label}
                  </button>
                </li>
             ))}
             </ul>
           </div>
         </div>
      </section>

      {/* Legacy Grid - Solid Black Background */}
      <section className="bg-[#000] relative z-30 pt-16 pb-32">
         <div className="container mx-auto px-4 lg:px-8">
           <div className="border-t border-white/10 pt-16 flex flex-col items-center">
             {!showExperiences ? (
               <button 
                 className="hover-target text-[var(--accent)] font-bebas tracking-[0.2em] text-xl md:text-2xl uppercase border border-[var(--accent)]/40 rounded-full px-12 py-4 transition-all duration-300 hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_rgba(184,151,90,0.4)]"
                 onClick={() => setShowExperiences(true)}
               >
                 + VIEW ALL PREVIOUS PROJECTS
               </button>
             ) : (
               <div className="w-full flex justify-center flex-col items-center">
                 <button 
                   className="hover-target text-[var(--accent)] font-bebas tracking-[0.2em] text-xl md:text-2xl uppercase border border-[var(--accent)]/40 rounded-full px-12 py-4 mb-12 transition-all duration-300 hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_rgba(184,151,90,0.4)]"
                   onClick={() => setShowExperiences(false)}
                 >
                   - HIDE PREVIOUS PROJECTS
                 </button>
                 <ul ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 max-w-6xl text-center w-full">
                   {EXPERIENCES.map((exp, idx) => (
                     <li key={idx} className="text-[0.75rem] text-[#666666] font-manrope font-normal leading-[1.6] tracking-wide hover:text-[#aaaaaa] transition-colors" title={exp}>
                       {exp}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
           </div>
         </div>
      </section>
    </>
  );
}
