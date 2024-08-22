//手写箭头函数转换插件
const core = require('@babel/core'); //babel核心模块
const { visitors } = require('@babel/traverse');
const { arrowFunctionExpression } = require('@babel/types');

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    arrowFunctionExpression(path) {
      let { node } = path;
      node.type = 'FunctionExpression'; //将箭头函数转换为普通函数
    },
  },
};

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path;
      if (type.isMemberExpression(node.callee)) {
        if (node.callee.object.name === 'console') {
          //找到console
          if (
            ['log', 'info', 'warn', 'error'].includes(node.callee.property.name)
          ) {
            //找到符合的方法名
            const { line, column } = node.loc.start; //找到所处位置的行和列
            node.arguments.push(types.stringLiteral(`[${line},${column}]`)); //向右边添加我们的行和列信息
            //找到文件名
            const filename = state.file.opts.filename;
            //输出文件的相对路径
            const relativeName = pathlib
              .relative(__dirname, filename)
              .replace(/\\/g, '/'); //兼容window
            node.arguments.push(types.stringLiteral(relativeName)); //向右边添加我们的行和列信息
          }
        }
      }
    },
  },
};

let sourceCode = `
    const sum = (a, b) => {
    return a + b;
}
`;
let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);
