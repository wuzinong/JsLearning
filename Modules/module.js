//https://juejin.cn/post/7147365025047379981/

Object.prototype.toString.call('hello'); // "[object String]"
Object.prototype.toString.call([1, 2]); // "[object Array]"
Object.prototype.toString.call(3); // "[object Number]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
// ... and more

Object.prototype.toString.call(new Map()); // "[object Map]"
Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
// ... and more

//这里 toString() 方法能识别 Map、GeneratorFunction、Promise这些类型是因为浏览器引擎为它们设置好了 toStringTag 标签
//引自官方介绍：Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里
const obj = {};

//定义属性
Object.defineProperty(obj, Symbol.toStringTag, { value: 'Module' });

//查看自定义类型
console.log(Object.prototype.toString.call(obj)); //'[object Module]'改变了类型为Module

//CommonJs模块化实现原理

//name.js
module.exports = 'xxxxx';

// main.js
let author = require('./name.js');
console.log(author, 'author');

//将name.js中的内容转换到一个modules对象中，该对象中key值为该模块路径，value值为该模块代码。在require函数执行时获取导出对象。
var modules = {
  './name.js': (module) => {
    module.exports = 'xxxxx';
    return module.exports;
  },
};
const require = (modulePath) => {
  return modules[modulePath]();
};

let author = require('./name.js');

//Advanced require
var cache = {};
function advancedRequire(modulePath) {
  var cachedModule = cache[modulePath]; //获取模块缓存
  if (cachedModule !== undefined) {
    //如果有缓存则不允许模块内容，直接retuen导出的值
    return cachedModule.exports;
  }
  //如果没有缓存，则定义module对象，定义exports属性
  //这里注意！！！module = cache[modulePath] 代表引用的是同一个内存地址
  var module = (cache[modulePath] = {
    exports: {},
  });
  //运行模块内的代码，在模块代码中会给module.exports对象赋值
  modules[modulePath](module, module.exports, require);

  //导入module.exports对象
  return module.exports;
}

//ES Module模块化原理

//name.js
const author = 'xxxxx';

export const age = '18';
export default author;

//main.js
import author, { age } from './name';

console.log(author, 'author');
console.log(age, 'age');

//将 name.js 中导出的内容还是挂载在 exports 对象上，如果是通过export default 方式导出的，那就在 exports 对象加一个 default 属性，将 name.js 中导出的内容变成这样

const exports = {
  age: '18',
  default: 'xxxxx',
};

// 然后在模块引用时（在 Webpack 编译时会将
// import author from "./name"
// 代码块转换成 const exports = require(./name) 代码块），
// 这样在 main.js 中拿到的是还是这个 exports 对象，就能够正常取值啦。只不过这里给exports赋值的方式是通过代理做到的
//模块定义
var modules = {
  './src/name.js': (module, exports, require) => {
    //给该模块设置tag：标识这是一个ES Module
    require.setModuleTag(exports);
    //通过代理给exports设置属性值
    require.defineProperty(exports, {
      age: () => age,
      default: () => DEFAULT_EXPORT,
    });
    const author = '不要秃头啊';
    const age = '18';
    const DEFAULT_EXPORT = author;
  },
};

var cache = {};
function require(modulePath) {
  var cachedModule = cache[modulePath];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (cache[modulePath] = {
    exports: {},
  });
  modules[modulePath](module, module.exports, require);
  return module.exports;
}

//对exports对象做代理
require.defineProperty = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key],
    });
  }
};

//标识模块的类型为ES Module
require.setModuleTag = (exports) => {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module',
  });

  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
};

//以下是main.js编译后的代码
//拿到模块导出对象exports
var _name__WEBPACK_IMPORTED_MODULE_0__ = require('./src/name.js');

console.log(_name__WEBPACK_IMPORTED_MODULE_0__['default'], 'author');
console.log(_name__WEBPACK_IMPORTED_MODULE_0__.age, 'age');

// 这里与 CommonJS 模块化原理不同的在于：

// 通过 require.setModuleTag 函数来标识这是一个ES Module(在现在这个例子中其实没什么作用)
// 给传入的 exports 对象通过 Object.defineProperty 做了一层代理（这样当访问default属性时，其实访问的是DEFAULT_EXPORT变量，访问age属性时，访问的是age变量）。
