module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'testing-library'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@modules', './src/modules'],
        ['@components', './src/components'],
        ['@utils', './src/utils'],
        ['@routes', './src/routes'],
      ],
    },
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
