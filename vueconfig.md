# vue.config.js 配置

- publicPath
- outputDir
- assetsDir
- indexPath
    指定生成的 index.html 的输出路径
- filenameHashing
    生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    这也要求 index 的 HTML 是被 Vue CLI 自动生成的
- pages
    [key]:{
        entry,
        template,
        filename,
        title,
        chunks
    }
- lintOnSave
- runtimeCompiler [vue-template]
    是否使用包含运行时编译器的 Vue 构建版本。
    设置为 true 后你就可以在 Vue 组件中使用 template 选项了，
    但是这会让你的应用额外增加 10kb 左右。
- transpileDependencies
- productionSourceMap
    不需要生产环境的source map，可以设置false加速环境构建
    有了sourceMap，浏览器控制台将直接显示原始代码出错的位置，而不是转换后的代码
- crossorigin
    仅对 html-webpack-plugin注入的变迁生效
- integrity
- configureWebpack
- chainWebpack
- css.requireModuleExtension
    默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
    设置为 false 后你就可以去掉文件名中的 .module 
    并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
- css.extract
    是否将组件中的CSS提取至一个独立的CSS文件中
    CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容
- css.sourceMap
    是否为CSS开启sourceMa
- css.loaderOptions
    向CSS相关的loader传递选项
- devServer
- devServer.proxy
- parallel
    是否为 Babel 或 TypeScript 使用 thread-loader。
    该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
- pwa
    向 PWA 插件传递选项
- pluginOptions
  这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
  
babel
    babel.config.js
eslint
    .eslintrc
typescript
    tsconfig.json

@vue/plugin-uint-jest
@vue/cli-plugin-unit-mocha
@vue/cli-plugin-e2e-cypress
@vue/cli-plugin-e2e-nightwatch
