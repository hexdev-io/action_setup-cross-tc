module.exports = {
  plugins: [
    `@typescript-eslint`,
  ],

  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 2,

    '@typescript-eslint/no-unused-vars': [1, {
      args: `none`,
      ignoreRestSiblings: true,
    }],

    'consistent-return': 2,

    'dot-notation': 2,

    'no-async-promise-executor': 2,

    'no-case-declarations': 2,

    'no-compare-neg-zero': 2,

    'no-cond-assign': 2,

    'no-constant-condition': [`error`, {
      checkLoops: false,
    }],

    'no-control-regex': 2,

    'no-debugger': 2,

    'no-empty': [`error`, {
      allowEmptyCatch: true,
    }],

    'no-empty-character-class': 2,

    'no-empty-pattern': 2,

    'no-fallthrough': 2,

    'no-global-assign': 2,

    'no-import-assign': 2,

    'no-inner-declarations': 2,

    'no-octal': 2,

    'no-prototype-builtins': 2,

    'no-regex-spaces': 2,

    'no-sparse-arrays': 2,

    'no-unneeded-ternary': 2,

    'no-unused-labels': 2,

    'no-useless-catch': 2,

    'no-useless-escape': 2,

    'no-with': 2,

    'object-shorthand': 2,

    'prefer-arrow-callback': 2,

    'prefer-const': [`error`, {
      destructuring: `all`,
      ignoreReadBeforeAssign: true,
    }],

    'prefer-template': 2,

    'require-yield': 2,

    'use-isnan': 2,
  },
  overrides: [
    {
      files: [`*.ts`, `*.tsx`],
      rules: {
        // Checked by Typescript - ts(2378)
        'getter-return': 0,

        // Checked by Typescript - ts(2300)
        'no-dupe-args': 0,

        // Checked by Typescript - ts(1117)
        'no-dupe-keys': 0,

        // Checked by Typescript - ts(7027)
        'no-unreachable': 0,

        // Checked by Typescript - ts(2367)
        'valid-typeof': 0,

        // Checked by Typescript - ts(2588)
        'no-const-assign': 0,

        // Checked by Typescript - ts(2588)
        'no-new-symbol': 0,

        // Checked by Typescript - ts(2376)
        'no-this-before-super': 0,

        // This is checked by Typescript using the option `strictNullChecks`.
        'no-undef': 0,

        // Replaced by `@typescript-eslint/no-unused-vars`
        'no-unused-vars': 0,

        // This is already checked by Typescript.
        'no-dupe-class-members': `off`,

        // This is already checked by Typescript.
        'no-redeclare': `off`,
      },
    },
  ],
    parser: require.resolve(`@typescript-eslint/parser`),
  
    env: {
      node: true,
      es6: true,
    },
  
    parserOptions: {
      ecmaVersion: 6,
      sourceType: `module`,
      ecmaFeatures: {
        modules: true,
      },
    },
  };