const js = require('@eslint/js');

// eslint.config.js

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                process: 'readonly',
                console: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
];
