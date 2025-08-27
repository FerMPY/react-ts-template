// @ts-check
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintConfigPrettier from "eslint-config-prettier";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import react from "@eslint-react/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginImportX from "eslint-plugin-import-x";
import pluginRouter from "@tanstack/eslint-plugin-router";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
  js.configs.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { ignores: ["dist"] },
  {
    ...eslintPluginImportX.flatConfigs.recommended,
    ...eslintPluginImportX.flatConfigs.typescript,
    ...react.configs["recommended-type-checked"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      //typescript-eslint
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": "allow-with-description" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      //simple-import-sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^.+\\.s?css$"],
            [
              "^node:.*\\u0000$",
              "^@?\\w.*\\u0000$",
              "^[^.].*\\u0000$",
              "^\\..*\\u0000$",
            ],
            ["^react$", "^react-dom$", "^node:"],
            ["^next"],
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            ["^~(/.*|$)"],
            ["^@(/.*|$)"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
);
