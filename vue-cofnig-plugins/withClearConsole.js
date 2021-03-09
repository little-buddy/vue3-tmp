/* eslint-disable @typescript-eslint/no-var-requires */
const { IS_PROD } = require('./util');

// fix HMR
// TODO need install bable-plugin-transform-remove-console
module.exports = config => {
	const prev = config.chainWebpack;

	config.chainWebpack = conf => {
		prev(conf);
		if (!conf.plugins) {
			conf.plugins = [];
		}
		if (IS_PROD) {
			conf.plugins.push('transform-remove-console');
		}
	};
};
