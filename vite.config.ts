import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/todo-daily",
  plugins: [tailwindcss()],
});
