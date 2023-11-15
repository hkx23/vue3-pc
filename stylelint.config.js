module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard'],
  rules: {
    'no-descending-specificity': null,
    'import-notation': 'string',
    'no-empty-source': null,
    'media-query-no-invalid': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  // ignoreFiles: ['src/style/theme.css'],
};
