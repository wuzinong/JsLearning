//https://juejin.cn/post/7157739406835580965

//https://webpack.docschina.org/api/loaders/#pitching-loader
//loader 总是 从右到左被调用。有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法。

//对于以下 use 配置：

module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ['a-loader', 'b-loader', 'c-loader'],
      },
    ],
  },
};

//将会发生这些步骤：

// |- a-loader `pitch`
//   |- b-loader `pitch`
//     |- c-loader `pitch`
//       |- requested module is picked up as a dependency
//     |- c-loader normal execution
//   |- b-loader normal execution
// |- a-loader normal execution

//传递给 pitch 方法的 data，在执行阶段也会暴露在 this.data 之下，并且可以用于在循环时，捕获并共享前面的信息。
//如果某个 loader 在 pitch 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader。
//在我们上面的例子中，如果 b-loader 的 pitch 方法返回了一些东西：
// module.exports = function (content) {
//     return someSyncOperation(content);
//   };

//   module.exports.pitch = function (remainingRequest, precedingRequest, data) {
//     if (someCondition()) {
//       return (
//         'module.exports = require(' +
//         JSON.stringify('-!' + remainingRequest) +
//         ');'
//       );
//     }
//   };
//上面的步骤将被缩短为：

// |- a-loader `pitch`
//   |- b-loader `pitch` returns a module
// |- a-loader normal execution

//Loader 本质上是导出为函数的 JavaScript 模块。它接收资源文件或者上一个 Loader 产生的结果作为入参，也可以用多个 Loader 函数组成 loader chain（链），最终输出转换后的结果。
//loader chain（链）：这里拿 .less 文件举例

// module: {
//     rules: [
//       {
//         test: /\.less$/,
//         use: [
//           "style-loader", //将css内容变成style标签插入到html中去
//           "css-loader", //解析css文件的路径等
//           "less-loader", //将less=>css
//         ],
//       },
//     ],
//   },
//这里要注意的是，如果是组成的loader chain（链），它们的执行顺序是从右向左，或者说是从下往上执行的，至于什么会这样下面会详细说到。
//loader chain（链） 这样设计的好处，是可以保证每个 Loader 的职责单一。同时，也方便后期 Loader 的组合和扩展。

/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function webpackLoader(content, map, meta) {
  // 你的 webpack loader 代码
}

//https://webpack.docschina.org/configuration/module/#ruleenforce
//Loader 按类型分可以分为四种：前置(pre)、普通(normal)、行内(inline)、后置(post)。

// /假如现在我们的 rule 配置是这样：
{
    test: /\.js$/,
    use: [
      {
        loader: "a-loader",
        enforce: "pre",
      },
      {
        loader: "b-loader",
        enforce: "post",
      },
      {
        loader: "c-loader",
        enforce: "pre",
      },
      {
        loader: "d-loader",
        enforce: "post",
      },
      {
        loader: "e-loader",
        enforce: "normal",
      },
      {
        loader: "f-loader",
        enforce: "normal",
      },
    ],
  }
//这些 loader 的执行顺序是什么样的？
//答案是：Webpack 内部先会对 loader 的类型进行分类，先找出各个类型的 loader，比如该例子：


// post类型loader
const postLoaders = ["b-loader", "d-loader"];
// inline类型loader
const inlineLoaders = [];
// normal类型loader
const normalLoaders = ["e-loader", "f-loader"];
// pre类型loader
const preLoaders = ["a-loader", "c-loader"];

//找出所有类型的 loader 之后进行合并：
let loaders = [
    ...postLoaders,
    ...inlineLoaders,
    ...normalLoaders,
    ...preLoaders,
  ];
  // 结果为: ['b-loader', 'd-loader', 'e-loader', 'f-loader', 'a-loader', 'c-loader']
  //这个时候再去理解它的执行顺序就是：
  b-loader 的 pitch 阶段 -> 
  d-loader 的 pitch 阶段 -> 
  e-loader 的 pitch 阶段 -> 
  f-loader 的 pitch 阶段 -> 
  a-loader 的 pitch 阶段 -> 
  c-loader 的 pitch 阶段 -> 
  c-loader 的 normal 阶段 -> 
  a-loader 的 normal 阶段 ->
  f-loader 的 normal 阶段 -> 
  e-loader 的 normal 阶段 ->
  d-loader 的 normal 阶段 -> 
  b-loader 的 normal 阶段 ->
  
  //此时再看之前的结论，是不是更清晰明了:
//Pitching 阶段: Loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
//Normal 阶段: Loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。

//***在 Pitch 阶段，如果执行到该 Loader 的 pitch 属性函数时有返回值，就直接结束 Pitch阶段，并直接跳到该Loader pitch 阶段的前一个 Loader 的 normal 阶段继续执行（若无前置Loader，则直接返回）  */






