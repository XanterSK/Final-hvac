"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ComesInGoesOutUnderlineProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  href: string;
  onClick?: () => void;
  underlineClassName?: string;
};

export function ComesInGoesOutUnderline({
  active = false,
  children,
  className,
  direction = "left",
  href,
  onClick,
  underlineClassName,
}: ComesInGoesOutUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = active || isHovered;

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-flex items-center justify-center pb-1 text-sm uppercase tracking-[0.24em] transition-colors duration-300",
        active ? "text-[#b8975a]" : "text-[#f0ece4]/78 hover:text-[#f0ece4]",
        className,
      )}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-current",
          underlineClassName,
        )}
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scaleX: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: direction === "left" ? "left center" : "right center",
        }}
      />
    </a>
  );
}

export default ComesInGoesOutUnderline;
