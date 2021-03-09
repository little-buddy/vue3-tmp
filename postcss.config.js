module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue: 75,
			unitPrecision: 5,
			propsList: [],
			selectorBlackList: [],
			minPixelValue: 0,
			exclude: /node_modules/i,
		},
	},
};
