module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint: recommended',
    'plugin:react/recommended',
    'plugin:jsx-ally/recommended',
    'plugin:import/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extension: ['.js', '.jsx'] }],
  },
};
