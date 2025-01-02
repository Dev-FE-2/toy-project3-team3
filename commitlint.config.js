export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feature',
        'fix',
        'docs',
        'design',
        'style',
        'refactor',
        'test',
        'rename',
        'chor',
        'setting',
      ],
    ],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    'subject-full-stop': [2, 'never', '.'],
  },
};
