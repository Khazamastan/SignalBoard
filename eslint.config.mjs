import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/features/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app",
                "@/app/*",
                "@/app/**",
                "src/app/*",
                "src/app/**",
              ],
              message: "feature layer cannot import app layer.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app",
                "@/app/*",
                "@/app/**",
                "@/features",
                "@/features/*",
                "@/features/**",
                "src/app/*",
                "src/app/**",
                "src/features/*",
                "src/features/**",
              ],
              message: "shared layer cannot import app or feature layers.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/design-system/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/*",
                "src/*",
                "src/**",
                "../src/*",
                "../src/**",
                "../../src/*",
                "../../src/**",
                "../../../src/*",
                "../../../src/**",
                "../../../../src/*",
                "../../../../src/**",
              ],
              message: "design-system layer cannot import from src/*.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
