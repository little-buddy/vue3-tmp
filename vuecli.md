# Vue-cli v.4

### 插件包
```
- @vue/cli
- @vue/cli-service-global
    allows you to run  vue serve  and  vue build  directly 
    without any local dependencies
- @vue/cli-service
    built on top of webpack and webpack-dev-server.
- @vue/cli-plugin- xxx
    When you run the vue-cli-service binary inside your project, 
    it automatically resolves and loads all CLI Plugins listed 
    in your project's package.json.
```
### 创建
```
vue create

~/.vuerc
被保存的 preset 将会存在用户的 home 目录下一个名为 .vuerc 的 JSON 文件里。
如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

vue ui 使用图形化界面
```
### 添加插件
```
vue add eslint
将 @vue/eslint 解析为完整的包名 @vue/cli-plugin-eslint
然后从 npm 安装它，调用它的生成器

@vue/cli-plugin-eslint
lintOnSave 打开是否每次保存都进行一遍eslint校验并输出

如果出于一些原因你的插件列在了该项目之外的其它 package.json 文件里，
你可以在自己项目的 package.json 里设置 vuePlugins.resolveFrom 选项指向包含其它 package.json 的文件夹。
```
### Preset 的概念
```
一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，
让用户无需在命令提示中选择它们。

```
## 开发
### 浏览器兼容性
```
- browserslist
    你会发现有 package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，
    指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 
    用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。
    
- Ployfill
    @vue/babel-preset-app => @babel/preset-env
    默认情况下，它会把 useBuiltIns: 'usage' 传递给 @babel/preset-env
    这样它会根据源代码中出现的语言特性自动检测需要的 polyfill
    如果有依赖需要 polyfill，你有几种选择：
        - 如果该依赖基于一个目标环境不支持的 ES 版本撰写
            将其添加到 vue.config.js 的 transpileDependencies
            这会为该依赖同时开启语法转换和根据使用情况检测 polyfill
        - 如果该依赖交付了 ES5 代码并显式地列出了需要的 polyfill
            你可以使用 @vue/babel-preset-app 的 polyfills 选项预包含所需要的 polyfill
        - 如果该依赖交付 ES5 代码，但使用了 ES6+ 特性且没有显式地列出需要的 polyfill
            使用 useBuiltIns: 'entry' 然后在入口文件添加
            import 'core-js/stable'; 
            import 'regenerator-runtime/runtime';

还有一个是否构建现代版本的实验性选项
    vue-cli-service build --modern
```
### HTML 和 静态资源
```
public/index.html 文件是一个会被 html-webpack-plugin 处理的模板
Vue CLI 也会自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 
以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接


因为 index 文件被用作模板，所以你可以使用 lodash template 语法插入内容：
<%= VALUE %> 用来做不转义插值；
<%- VALUE %> 用来做 HTML 转义插值；
<% expression %> 用来描述 JavaScript 流程控制。

默认情况下，一个 Vue CLI 应用会为所有初始化渲染需要的文件自动生成 preload 提示。
这些提示会被 @vue/preload-webpack-plugin 注入，
并且可以通过 chainWebpack 的 config.plugin('preload') 进行修改和删除。

默认情况下，一个 Vue CLI 应用会为所有作为 async chunk 生成的 JavaScript 文件 (通过动态 import() 按需 code splitting 的产物) 自动生成 prefetch 提示。
这些提示会被 @vue/preload-webpack-plugin 注入，
并且可以通过 chainWebpack 的 config.plugin('prefetch') 进行修改和删除。

当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：
import(/* webpackPrefetch: true */ './someAsyncComponent.vue')

```
### CSS 相关
```
如果你想自动化导入文件 (用于颜色、变量、mixin……)，你可以使用 style-resources-loader

PostCSS
你可以通过 .postcssrc 支持的配置源来配置 PostCSS
也可以通过 vue.config.js 中的 css.loaderOptions.postcss 配置 postcss-loader

CSS Modules
你可以通过 <style module> 以开箱即用的方式在 *.vue 文件中使用 CSS Modules
如果你想去掉文件名中的 .module，可以设置 vue.config.js 中的 css.requireModuleExtension 为 false

向预处理器 Loader 传递选项
{
    css:{
        loaderOptions:{
            sass:{
                additionalData: `@import "~@/variables.sass"`
            }
        }
    }
}
```
### webpack相关
```
configureWebpack => webpack-merge
chainWebpack => webpack-chain

- 修改 Loader 选项
- 添加一个新的Loader
- 修改插件选项
```
### 模式和环境变量
```
- development => serve
- test => test:unit
- production => build / test:e2e
```
### 构建目标
```
- 应用
    默认模式
    * index.html 会带有注入的资源和 resource hint 
    * 第三方库会被分到一个独立包以便更好的缓存
    * 小于4kb 静态资源内联在JavaScript中
    * public 中的静态资源会被复制到输出目录中
- 库
    关于 IE 兼容性的提醒
        项目的 publicPath 是根据主文件的加载路径动态设置的
        这个功能用到了 document.currentScript
        用库之前先在页面上引入 current-script-polyfill
    注意对 Vue 的依赖
        在库模式中，Vue 是外置的
        
    这个入口可以是一个 .js 或 .vue 文件，如果没有指定入口，则会使用 src/App.vue
        =>
            myLib.common.js
            myLib.umd.js
            myLib.umd.min.js
            myLib.css(可以在vue.config.js中设置 css:{extract:false}强制内联) 
- Web Components组件
    Web Components 不支持IE11及更低版本
    依赖 @vue/web-component-wrapper,将一个 Vue 组件包裹并注册为一个自定义元素。
    
注册多个 Web Components 组件的包

异步 Web Components 组件
    
```
### 对于 Git Hooks 的提示
```
@vue/cli-service also installs yorkie
yorkie is a fork of husky
```
```js
/* URL 转换规则
    - 绝对路径
    - 以 . 开头，作为一个相对模块请求被解释且基于你的文件目录
    - 以 ~ 开头，作为 node_moudles 中的模块请求
    - 以 @ 开头，作为一个 alias 模块请求
 */
```
### 审查 webpack 项目配置
```
    vue inspect > output.js
```













