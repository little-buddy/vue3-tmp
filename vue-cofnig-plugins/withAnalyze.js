/* eslint-disable @typescript-eslint/no-var-requires */
const { IS_PROD } = require('./util');

// fix HMR
module.exports = config => {
	const prev = config.chainWebpack;

	config.chainWebpack = conf => {
		prev(conf);
		if (IS_PROD)
			conf.plugin('webpack-report').use(require('webpack-bundle-analyzer'), [
				{
					analyzerMode: 'static',
				},
			]);
	};
};
