import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        AbortController: "readonly",
        clearTimeout: "readonly",
        fetch: "readonly",
        process: "readonly",
        Request: "readonly",
        Response: "readonly",
        URL: "readonly",
        React: "readonly",
        setTimeout: "readonly",
      },
    },
  },
];
