module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'xo',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'keyword-spacing': ['error', {
			overrides: {
				if: {after: false},
				for: {after: false},
				while: {after: false},
				static: {after: false},
				as: {after: false},
			},
		}],
		'no-multiple-empty-lines': ['error', {max: 2}],
		'no-trailing-spaces': ['error', {skipBlankLines: true}],
		'no-alert': 0,
		'object-curly-spacing': ['error', 'always'],
		'eol-last': 0,
	},
};
