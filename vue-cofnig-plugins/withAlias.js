/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const resolve = dir => path.join(process.cwd(), `${dir}`);

// fix HMR
module.exports = config => {
	const prev = config.chainWebpack;
	config.chainWebpack = conf => {
		prev(conf);
		conf.resolve.alias
			.set('vue$', 'vue/dist/vue.esm-bundler.js')
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@views', resolve('src/views'))
			.set('@router', resolve('src/router'))
			.set('@store', resolve('src/store'))
			.set('@layouts', resolve('src/layouts'))
			.set('@static', resolve('src/static'));
	};
};
