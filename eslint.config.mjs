import react from 'eslint-plugin-react';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist/**/*',
      '**/build/**/*',
      '**/node_modules/**/*',
      '**/*.test.\\{js,jsx,ts,tsx}',
      '**/*.spec.\\{js,jsx,ts,tsx}',
      '**/config-overrides.js',
      '**/ecosystem.config.js',
      '**/react-app-env.d.ts',
      '**/reportWebVitals.ts',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      react,
      //   '@typescript-eslint': typescriptEslint,
      prettier,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
      },
    },

    rules: {
      'prettier/prettier': 'off',
      //   'comma-dangle': 'off',
      //   'jsx-a11y/alt-text': 'off',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info', 'trace'],
        },
      ],

      'import/no-extraneous-dependencies': 'off',

      // "@typescript-eslint/no-unused-vars": ["error", {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_",
      //     caughtErrorsIgnorePattern: "^_",
      // }],

      // "@typescript-eslint/comma-dangle": ["off", "always-multiline"],

      // "@typescript-eslint/naming-convention": ["error", {
      //     selector: "variable",
      //     format: ["camelCase", "PascalCase", "UPPER_CASE"],
      //     leadingUnderscore: "allow",
      // }],

      // "@typescript-eslint/no-use-before-define": "off",
      // "@typescript-eslint/no-non-null-assertion": "off",
      // "@typescript-eslint/ban-ts-comment": "off",
      // "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    },
  },
];
