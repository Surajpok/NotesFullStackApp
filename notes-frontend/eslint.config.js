module.exports = {
  root: true,
  parser: '@babel/eslint-parser', // Use Babel parser for modern JS/JSX syntax
  parserOptions: {
    ecmaVersion: 2021, // Supports modern ECMAScript features
    sourceType: 'module', // Allows usage of import/export
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  env: {
    browser: true, // Browser global variables
    node: true,    // Node.js global variables
    es2021: true,  // Modern ES2021 global variables
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  plugins: [
    'react',        // React specific linting rules
    'react-hooks',  // Enforces React hooks rules
    'import',       // Linting for ES6+ imports
    'jsx-a11y',     // Accessibility rules for JSX
    'prettier',     // Prettier integration for formatting
  ],
  extends: [
    'eslint:recommended',    // Recommended ESLint rules
    'plugin:react/recommended', // Recommended React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended',   // Accessibility rules
    'plugin:import/errors',         // Import errors
    'plugin:import/warnings',       // Import warnings
    'plugin:prettier/recommended',  // Prettier integration
  ],
  rules: {
    'prettier/prettier': 'error', // Ensure Prettier rules are respected
    'react/prop-types': 'off',    // Disable prop-types as TypeScript is preferred
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars, ignore prefixed with '_'
    'react/jsx-uses-react': 'off', // Not needed for React 17+
    'react/jsx-uses-vars': 'error', // Prevent React components from being marked as unused
    'import/order': [              // Ensure organized import order
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'jsx-a11y/anchor-is-valid': [  // Accessibility rules for anchors
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Specific rules for TypeScript files
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended', // TypeScript rules
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '*.config.js'], // Ignore specific folders and files
};
