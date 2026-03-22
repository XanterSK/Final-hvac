"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    const handleHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (target.classList.contains("hover-hide")) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
        return;
      }
      gsap.to(cursor, {
        scale: 1.8,
        backgroundColor: "rgba(184, 151, 90, 0.15)",
        borderColor: "rgba(184, 151, 90, 0.8)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(184, 151, 90, 0.6)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Initial binding
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .hover-target, details, .hover-hide"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    const observer = new MutationObserver(() => {
      const newInteractiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, .hover-target, details, .hover-hide"
      );
      newInteractiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "1px solid rgba(184, 151, 90, 0.6)",
        pointerEvents: "none",
        zIndex: 99999,
        transition: "opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
        willChange: "transform, opacity, width, height, background-color",
      }}
    />
  );
}
