# vue3-tmp

```
### Project setup
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Run your unit tests
npm run test:unit

### Lints and fixes files
npm run lint

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```

```
    splitChunks存在默认配置，区分 vendors / common
    images 默认使用了 url-loader 进行处理
```

### 向 sass 提供全局样式，以及全局变量
```js
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import "@scss/variables.scss";
        @import "@scss/mixins.scss";
        @import "@scss/function.scss";
        $src: "${process.env.VUE_APP_OSS_SRC}";
        `
      }
    }
  }
};
```

### 静态资源自动打包上传阿里 oss、华为 obs
```js
// 其实是依赖 官方提供的webpack 插件来实现
const AliOssPlugin = require("webpack-oss");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const format = AliOssPlugin.getFormat();

module.exports = {
  publicPath: IS_PROD ? `${process.env.VUE_APP_PUBLIC_PATH}/${format}` : "./", // 默认'/'，部署应用包时的基本 URL
  configureWebpack: config => {
    const plugins = [];

    if (IS_PROD) {
      plugins.push(
        new AliOssPlugin({
          accessKeyId: process.env.ACCESS_KEY_ID,
          accessKeySecret: process.env.ACCESS_KEY_SECRET,
          region: process.env.REGION,
          bucket: process.env.BUCKET,
          prefix: process.env.PREFIX,
          exclude: /.*\.html$/,
          format
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  }
};
```

### eslint
```
继承自
    eslint-plugin-vue => config => vue-essential
    eslint => recommended
    @vue => eslint-config-typescript
    @vue => eslint-config-prettier
```
