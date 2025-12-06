// @ts-ignore
import drizzle from 'eslint-plugin-drizzle';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  plugins: { drizzle },
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
  },
  rules: {
    'vue/max-attributes-per-line': 'off',
    '@stylistic/max-statements-per-line': ['error', { max: 2 }],
    '@stylistic/semi': ['error', 'always'],
    'vue/multi-word-component-names': 'off',
  },
});
