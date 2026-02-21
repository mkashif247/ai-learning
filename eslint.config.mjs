import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── Core Rules ────────────────────────────────────
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // ── TypeScript Strict ────────────────────────
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // ── Imports ──────────────────────────────────
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-duplicate-imports": "error",

      // ── Code Quality & Complexity ────────────────
      "max-lines": [
        "error",
        { max: 500, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["error", { max: 15 }],
      "max-depth": ["error", 3],
      "max-params": ["error", 3],
      "no-console": "warn",

      // ── Clean Code ───────────────────────────────
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-else-return": "error",
      "no-unneeded-ternary": "error",
      "no-nested-ternary": "error",
      "no-useless-return": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "no-param-reassign": "error",

      // ── React Best Practices ─────────────────────
      ...reactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-no-leaked-render": "error",
      "react/no-array-index-key": "error",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/jsx-fragments": ["error", "syntax"],

      // ── Accessibility ────────────────────────────
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },

  // ── API Route Overrides ───────────────────────────
  {
    files: ["src/app/api/**/*.ts"],
    rules: {
      "max-lines-per-function": [
        "warn",
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // ── Page Component Overrides ──────────────────────
  {
    files: ["src/app/**/page.tsx", "src/app/**/layout.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // ── Ignore Patterns ───────────────────────────────
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
