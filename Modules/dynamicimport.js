const btnEle = document.getElementById('btn');

buttonEle.onclick = function () {
  import('./test').then((module) => {
    const print = module.default;
    print();
  });
};

// 第一步：当点击按钮时，先通过 jsonp 的方式去加载 test.js 模块所对应的文件
// 第二步：加载回来后在浏览器中执行此JS脚本，将请求过来的模块定义合并到 main.js 中的 modules 中去
// 第三步：合并完后，去加载这个模块
// 第四步：拿到该模块导出的内容

// 实际webpack会转换成：
buttonEle.onclick = function () {
  require
    .e('src_test_js') //完成第一步和第二步工作
    //完成第三步：前面代码加载合并完成后，去执行该模块代码
    .then(require.bind(require, './src/test.js'))
    .then((module) => {
      //完成第四步
      const print = module.default;
      print();
    });
};

//第一步：当点击按钮时，先通过 jsonp 的方式去加载 test.js 模块所对应的文件
// ------------------>
btnEle.addEventListener('click', async () => {
  require.e('src_test_js'); //src_test_js是test.js打包后的chunkName
});

//接下来就去实现require.e函数：
require.e = function (chunkId) {
  let promises = []; //定有promises，这里面放的是一个个Promise
  require.j(chunkId, promises); //给promises赋值
  return Promise.all(promises); //只有当promises中的所有promise都执行完成后，才能走到下一步
};

//require.j函数：这一步其实就是给promises数组赋值，并通过jsonp去加载文件
var installdeChunks = {
  main: 0,
};

//这里传入的是 "src_test_js" , []
require.j = function (chunkId, promises) {
  var promise = new Promise((resolve, reject) => {
    //此时installedChunks={ main: 0, "src_test_js":[ resolve, reject ]}
    installedChunks[chunkId] = [resolve, reject];
  });
  promises.push(promise); //此时promises=[ promise ]

  var url = require.publicPath + chunkId + '.main.js'; //拿到的结果就是test.js打包后输出的文件名称：src_test_js.main.js，publicPath就是我们在output中配置的publicPath，默认是空字符串
  let script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script); //将该脚本添加进来
};

//第二步：加载回来后在浏览器中执行此JS脚本，将请求过来的模块定义合并到 main.js 中的 modules 中去
//在第一步中我们通过jsonp的方式加载了src_test_js.main.js文件，加载后需要立即执行该文件的内容，我们先来看看该文件长什么样子：
self['webpackChunkstudy'].push([
  ['src_test_js'],
  {
    './src/test.js': (modules, exports, require) => {
      require.defineProperty(exports, {
        default: () => WEBPACK_DEFAULT_EXPORT,
      });
      const WEBPACK_DEFAULT_EXPORT = () => {
        console.log('按钮点击了');
      };
    },
  },
]);
//   这里的self其实就是window，webpackChunkstudy就是一个名字，
//   它是webpackChunk + 我们package.json 中的 name 字段拼接来的，我这里是study。
//   翻译过来就是要执行 window.webpackChunkstudy.push([xxx])这个函数，那接下来我们就实现一下它：
//   接受一个二维数组作为参数，二维数组中，第一项是moduleId，第二项是模块定义：

//初始化：默认情况下这里放的是同步代码块，这里的demo因为没有同步代码，所以是一个空的模块对象
var modules = {};
//这里chunkIds=["src_test_js"] moreModules={xxx} test.js文件的模块定义
function webpackJsonpCallback([chunkIds, moreModules]) {
  const resolves = [];
  for (let i = 0; i < chunkIds.length; i++) {
    const chunkId = chunkIds[i]; //src_test_js
    //此时installedChunks={ main: 0, "src_test_js":[ resolve, reject ]} ,将 src_test_js 的resolve放到resolves中去
    resolves.push(installedChunks[chunkId][0]);
    installedChunks[chunkId] = 0; //标识一下代码已经加载完成了
  }
  // moreModules是jsonp返回的chunk，把chunk中的模块定义合并到modules中去
  for (const moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId]; //合并modules，此时modules中有了test.js的代码
  }

  while (resolves.length) {
    resolves.shift()(); //执行promise中的resolve,当所有promises都resolve后，接下来执行第三步
  }
}
window.webpackChunkstudy.push = webpackJsonpCallback;

//此时 modules 已经变为：
var modules = {
  './src/test.js': (modules, exports, require) => {
    require.defineProperty(exports, {
      default: () => WEBPACK_DEFAULT_EXPORT,
    });
    const WEBPACK_DEFAULT_EXPORT = () => {
      console.log('按钮点击了');
    };
  },
};

//第三步：合并完后，去加载这个模块
//走到这里require.e函数中的 Promise.all 已经走完，接下来走到第一个.then处：require.bind(require, "./src/test.js")

require
  .e('src_test_js') //完成第一步和第二步的工作
  .then(require.bind(require, './src/test.js')); // 完成第三步;

//require函数与之前相同
var cache = {};
//相当于在浏览器中用于加载模块的polyfill
function require(moduleId) {
  var cacheModule = cache[moduleId];
  if (cacheModule !== undefined) {
    return cacheModule.exports;
  }
  var module = (cache[moduleId] = {
    exports: {},
  });
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.defineProperty = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperties(exports, key, {
      enumerable: true,
      get: definition[key],
    });
  }
};

//这里执行完require.bind(require, "./src/test.js")后，返回的是一个export对象：
    {
        default: () => {
            console.log('按钮点击了');
        } //因为这里是默认导出，所以是default
    }

//第四步：拿到该模块导出的内容
require.e("src_test_js") //完成第一步和第二步的工作
.then(require.bind(require, "./src/test.js")) //完成第三步：前面代码加载并合并完后，去执行该模块代码
.then((module) => { //完成第四步
  const print = module.default;
  print();
});
