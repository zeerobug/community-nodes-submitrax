/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.Config}
 */
module.exports = {
	extends: './.eslintrc.js',
	rules: {
		'n8n-nodes-base/node-param-description-missing-final-period': 'off',
		'n8n-nodes-base/node-param-display-name-miscased': 'off',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'off',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'off',
	},
};
