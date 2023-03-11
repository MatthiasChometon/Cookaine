module.exports = {
	extends: ['@antfu', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'antfu/if-newline': 'off',
	},
}
