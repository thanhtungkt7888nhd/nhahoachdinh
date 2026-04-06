import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#C8A84B", // vàng lúa chín – harvest gold
        navy:      "#1D3A1D", // xanh rừng thẳm – deep forest
        charcoal:  "#1C2A1C", // đen xanh rừng – forest dark
        beige:     "#F0E8D0", // màu rơm – warm straw cream
        earth:     "#4E7040", // xanh lá đạm – muted leaf green
        brown:     "#7A6830", // nâu vàng đất – warm earth gold
        muted:     "#546A4A", // xanh xám lá – green-grey text
      },
      fontFamily: {
        serif:  ["var(--font-alegreya)", "Georgia", "serif"],
        sans:   ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1140px",
      },
      fontSize: {
        "display": ["8rem",  { lineHeight: "1",   fontWeight: "400" }],
        "hero":    ["5rem",  { lineHeight: "1.1", fontWeight: "400" }],
        "section": ["3.5rem",{ lineHeight: "1.2", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
