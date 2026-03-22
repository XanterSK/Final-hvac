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
        "bg-primary": "#0a0a08",
        "bg-secondary": "#0f0f0d",
        "bg-tertiary": "#111110",
        "bg-card": "#161613",
        "bg-card-hover": "#1b1b18",
        accent: "#b8975a",
        "accent-hover": "#cfaf74",
        border: "rgba(184,151,90,0.15)",
        "text-primary": "#f0ece4",
        "text-secondary": "#c7bcac",
        "text-muted": "#8a8175",
      },
    },
  },
};

export default config;
