/* eslint-disable @typescript-eslint/no-var-requires */
const { IS_PROD } = require('./util');

// withSplit
module.exports = config => {
	const prev = config.configureWebpack;
	const prevChain = config.chainWebpack;

	config.configureWebpack = conf => {
		prev(conf);
		if (IS_PROD) {
			conf.externals = {
				vue: 'Vue',
				vuex: 'Vuex',
				'vue-router': 'VueRouter',
				axios: 'axios',
			};
		}
	};

	config.chainWebpack = conf => {
		prevChain(conf);
		if (IS_PROD) {
			conf.plugin('html').tap(args => {
				args[0].cdn = {
					css: [],
					js: [],
				};
				return args;
			});
		}
	};
};
