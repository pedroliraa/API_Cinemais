import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignora caminhos que não queremos lintar
  {
    ignores: ['node_modules/**', 'dist/**'],
  },

  // Config ESLint recomendada para JS
  js.configs.recommended,

  // Desliga regras conflitantes com Prettier
  configPrettier,

  // Regras do seu projeto
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // reconhece process, __dirname, etc.
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // mostra erro se formato estiver fora do padrão
    },
  },

  // Config extra para testes (faz o ESLint conhecer describe, test, expect)
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);
