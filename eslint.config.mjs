import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  eslint.configs.recommended,
  ...astro.configs.recommended,
];
