module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: '14.15.4' } }],
		'@babel/preset-typescript'
	],
	plugins: [
		'babel-plugin-transform-typescript-metadata',
		['@babel/plugin-proposal-decorators', { 'legacy': true }],
		['@babel/plugin-proposal-class-properties', { 'loose': true }]
	],
};
