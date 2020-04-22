module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
    },
    extends: [
        'airbnb-base',
    ],
    rules: {
        'indent': ['error', 4],
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-newline': ['error', {
            ImportDeclaration: { multiline: true, minProperties: 2 },
        }],
        'import/no-unresolved': 0,
    },
};
