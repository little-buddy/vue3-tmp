module.exports = {
	plugins: {
		'postcss-plugin-px2rem': {
			rootValue: 75,
			unitPrecision: 2,
			propWhiteList: [],
			propBlackList: ['border', 'text-shadow', 'box-shadow'],
			exclude: /node_modules/i,
			selectorBlackList: [],
			ignoreIdentifier: false,
			replace: true,
			mediaQuery: false,
			minPixelValue: 0,
		},
	},
};
