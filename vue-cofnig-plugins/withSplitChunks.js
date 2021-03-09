/* eslint-disable @typescript-eslint/no-var-requires */
const { IS_PROD } = require('./util');

// withSplit
module.exports = config => {
	const prev = config.configureWebpack;

	config.configureWebpack = conf => {
		prev(conf);
		if (IS_PROD) {
			conf.optimization = {
				splitChunks: {
					cacheGroups: {
						common: {
							name: 'chunk-common',
							chunks: 'initial',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 1,
							reuseExistingChunk: true,
							enforce: true,
						},
						vendors: {
							name: 'chunk-vendors',
							test: /[\\/]node_modules[\\/]/,
							chunks: 'initial',
							priority: 2,
							reuseExistingChunk: true,
							enforce: true,
						},
						// TODO 第三方库抽离案例
						// elementUI: {
						// 	name: 'chunk-elementui',
						// 	test: /[\\/]node_modules[\\/]element-ui[\\/]/,
						// 	chunks: 'all',
						// 	priority: 3,
						// 	reuseExistingChunk: true,
						// 	enforce: true,
						// },
					},
				},
			};
		}
	};
};
