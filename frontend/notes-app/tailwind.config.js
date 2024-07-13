/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used in the project
      colors:{primary:"#2b85ff",
      secondary:"#ef863f"},
      fontFamily: {
        minecraft: ["Minecraft", "sans-serif"],
        "minecraft-bold": ["MinecraftBold", "sans-serif"],
      },
    },
  },
  important: true,
  plugins: [],
}

