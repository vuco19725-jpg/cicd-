import { defineConfig } from "eslint";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
]);
