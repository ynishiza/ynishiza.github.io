// eslint-disable-next-line
module.exports = {
	env: {
		browser: true,
		es2021: true,
		mocha: true,
	},
	extends: "eslint:recommended",
	overrides: [
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	rules: {
		"no-unused-vars": ["off"],
		"no-trailing-spaces": ["error"],
		"indent": ["error", "tab", { "SwitchCase": 1, "MemberExpression": 1 }],
	}
}
