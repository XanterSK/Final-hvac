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
        "hero-bg": "#0a1628",
        "nav-bg": "#0d1f3c",
        accent: "#1a56db",
        "card-bg": "#1a2f4a",
        "text-primary": "#1e293b",
        "text-secondary": "#64748b",
        "text-light": "#f1f5f9",
        "border-color": "#dbe3ef",
      },
    },
  },
};

export default config;
