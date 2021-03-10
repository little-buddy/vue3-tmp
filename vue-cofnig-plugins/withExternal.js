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
				vue: 'Vue' /*@3.0.7*/,
				vuex: 'Vuex' /*@4.0.0*/,
				'vue-router': 'VueRouter' /*@4.0.4*/,
				axios: 'axios' /*@0.21.1*/,
			};
		}
	};

	config.chainWebpack = conf => {
		prevChain(conf);
		if (IS_PROD) {
			conf.plugin('html').tap(args => {
				args[0].cdn = {
					css: [],
					js: [
						'https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.cjs.prod.min.js' /*Vue@3.0.2*/,
						'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0-rc.1/vuex.cjs.min.js' /*Vuex@4.0.0.rc1*/,
						'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.0-rc.1/vue-router.cjs.prod.min.js' /*VueRouter@4.0.0-rc1*/,
						'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js' /*axios@0.21.1*/,
					],
				};
				return args;
			});
		}
	};
};
