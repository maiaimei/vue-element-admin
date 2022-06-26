module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    /* https://eslint.vuejs.org/user-guide/#faq
     * Compiler macros such as defineProps and defineEmits generate no-undef warnings
     * You need to use vue-eslint-parser (opens new window)v9.0.0 or later.
     * Previously you had to use the vue/setup-compiler-macros environment, this is no longer needed.
     */
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'space-before-function-paren': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
