/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Created by buddy on 2021/3/9.
 */

const webpack = require('webpack');

module.exports = config => {
	const prev = config.chainWebpack;

	config.chainWebpack = conf => {
		prev(conf);

		conf.plugin('ignore').use(new webpack.ContextReplacementPlugin(/monent[/\\]locale$/, /zh-cn$/));
	};
};
