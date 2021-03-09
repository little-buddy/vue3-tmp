/* eslint-disable @typescript-eslint/no-var-requires */
const { IS_PROD } = require('./util');

/*

{
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
{
	loader: '/Users/buddy/HelloC/vue3-tmp/node_modules/url-loader/dist/cjs.js',
		options: {
	limit: 4096,
		fallback: {
		loader: '/Users/buddy/HelloC/vue3-tmp/node_modules/file-loader/dist/cjs.js',
			options: {
			name: 'img/[name].[hash:8].[ext]'
		}
	}
}
}
]
},
* * */

//  TODO need image-webpack-loader
module.exports = config => {
	const prev = config.chainWebpack;

	config.chainWebpack = conf => {
		prev(conf);

		if (IS_PROD) {
			const imagesRule = conf.module.rule('images');
			imagesRule.uses.clear();

			imagesRule
				.use('image-webpack-loader')
				.loader('image-webpack-loader')
				.options({
					mozjpeg: { progressive: true, quality: 65 },
					optipng: { enabled: false },
					pngquant: { quality: [0.65, 0.9], speed: 4 },
					gifsicle: { interlaced: false },
				})
				.end()
				.use('url-loader')
				.loader('url-loader')
				.options({
					limit: 4096,
					fallback: {
						loader: require('file-loader'),
						options: {
							name: 'img/[name].[hash:8].[ext]',
						},
					},
				})
				.end();
		}
	};
};
