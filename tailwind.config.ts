import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a1628",
        "bg-secondary": "#0d1f3c",
        "bg-tertiary": "#111f38",
        "bg-card": "#1a2f4a",
        "bg-card-hover": "#1f3654",
        accent: "#1a56db",
        "accent-hover": "#1648c0",
        border: "rgba(255,255,255,0.08)",
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
      },
    },
  },
};

export default config;
