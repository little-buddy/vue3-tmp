/* eslint-disable @typescript-eslint/no-var-requires */
const withClearConsole = require('./vue-cofnig-plugins/withClearConsole');
const withDevServer = require('./vue-cofnig-plugins/withSplitChunks');
const withExternal = require('./vue-cofnig-plugins/withExternal');
const withAnalyze = require('./vue-cofnig-plugins/withAnalyze');
const withUglyImg = require('./vue-cofnig-plugins/withUglyImg');
const withFixHMR = require('./vue-cofnig-plugins/withFixHMR');
const withAlias = require('./vue-cofnig-plugins/withAlias');

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const vueConfig = {
	publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './',
	productionSourceMap: !IS_PROD,
	chainWebpack: config => {
		/**/
	},
	configureWebpack: config => {
		/**/
	},
	pages: {},
};

[withAlias, withAnalyze, withClearConsole, withDevServer, withExternal, withFixHMR, withUglyImg].forEach(fn =>
	fn(vueConfig)
);

module.exports = vueConfig;
