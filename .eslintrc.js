/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.Config}
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},
	ignorePatterns: ['.eslintrc.js', '**/*.js', '**/node_modules/**', '**/dist/**'],
	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			rules: {
				'n8n-nodes-base/community-package-json-name-still-default': 'error',
				'n8n-nodes-base/community-package-json-author-name-missing': 'error',
				'n8n-nodes-base/community-package-json-version-missing': 'error',
			},
		},
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
			rules: {
				'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'error',
				'n8n-nodes-base/node-resource-description-filename-against-convention': 'error',
				'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'error',
			},
		},
	],
};
