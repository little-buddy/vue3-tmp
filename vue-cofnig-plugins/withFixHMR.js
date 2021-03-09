/* eslint-disable @typescript-eslint/no-var-requires */

// fix HMR
module.exports = config => {
	const prev = config.chainWebpack;

	config.chainWebpack = conf => {
		prev(conf);
		conf.resolve.symlinks(true);
	};
};
