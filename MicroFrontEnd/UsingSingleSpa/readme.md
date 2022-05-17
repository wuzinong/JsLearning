# 微前端

## 多个微应用的组合

除了多个微应用，还存在一个容器应用，每个微应用都需要被注册到容器应用中。微前端中的每个应用都是一个独立的 javascript 模块，通过模块化的方式被容器应用启动和运行。使用模块化的方式可以防止不同的微应用在同事运行时发生冲突

## 微应用中实现路由

在微前端架构中，当路由发生变化时，容器应用首先会拦截路由变化，根据路由匹配微前端的应用，匹配到之后再启动微应用的路由，匹配具体的页面组件

## 微应用之间实现状态共享

可以使用发布订阅模式，比如 Rxjs

## 如何实现框架和库的共享

通过 import-map 和 webpack 中的 externals 属性

# System.js

使用 systemjs 实现浏览器中的模块化。我们可以使用 ES 模块规范，使用 babel 插件将其转化为 systemjs 支持的模块规范也可以使用 systemjs 插件让其支持 UMD 模块规范：

```javascript
//package.json
{
  "name": "systemjs-react",
  "scripts": {
    "start": "webpack serve"
  },
  "dependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-react": "^7.12.10",
    "babel-loader": "^8.2.2",
    "html-webpack-plugin": "^4.5.1",
    "webpack": "^5.17.0",
    "webpack-cli": "^4.4.0",
    "webpack-dev-server": "^3.11.2"
  }
}

//webpack.config.js
const path = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build"),
    libraryTarget: "system", //打包成systemjs认识的模块
  },
  devtool: "source-map",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWepackPlugin({
      template: "./src/index.html",
      inject: false, //别给我注入脚本
    }),
  ],
  externals: ["react", "react-dom", "react-router-dom"], //这些公用库不要给我打包
};
```

# single-spa

## 三种类型的微前端应用

### 1.single-spa-application:微前端架构中的微应用，可以使用 vue,react,angular 等框架，和路由相关联

### 2.single-spa-parcel:微前端架构中的微应用，可以使用 vue,react,angular 等框架，和路由无关，主要用于跨应用公用 ui 组件

### 3.sngle-spar root config: 创建微前端容器应用

### 4.utility modules: 公共模块应用，非渲染组件，用于跨应用共享 javascript 逻辑的微应用

# 创建容器应用

### 安装 single-spa 脚手架工具: npm install create-single-spa@2.0.3 -g

### 创建微前端应用目录: mkdir workspace && cd "$\_\_"

### 创建微前端容器应用：create-single-spa

#### 应用文件夹填写 container

#### 应用选择 single-spa root config

#### 组织名称填写 study, 组织名称可以理解为团队名称，微前端架构允许多团队公用开发应用，组织名称可以标识应用由哪个团队开发，应用名称的命名规范为 @组织名称/应用名称：如 @study/todos
