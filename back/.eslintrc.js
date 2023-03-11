module.exports = {
	'parser': '@typescript-eslint/parser',
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	'ignorePatterns': ['.eslintrc.js', '**/node_modules'],
	'plugins': [
		'@typescript-eslint',
		'prettier',
	],
	'rules': {
		'prettier/prettier': 'error',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
	},
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
}
