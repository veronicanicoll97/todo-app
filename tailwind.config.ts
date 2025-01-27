import type { Config } from "tailwindcss";
import defaultTheme  from "tailwindcss/defaultTheme"
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "Josefin": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
} satisfies Config;
