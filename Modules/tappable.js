https://juejin.cn/post/7164175171358556173

const SyncHook = require("../my/SyncHook"); //这是一个同步钩子

//第一步：实例化钩子函数，可以在这里定义形参
const syncHook = new SyncHook(["author", "age"]);

//第二步：注册事件1
syncHook.tap("监听器1", (name, age) => {
  console.log("监听器1:", name, age);
});

//第二步：注册事件2
syncHook.tap("监听器2", (name) => {
  console.log("监听器2", name);
});

//第三步：注册事件3
syncHook.tap("监听器3", (name) => {
  console.log("监听器3", name);
});
//第三步：触发事件，这里传的是实参，会被每一个注册函数接收到
syncHook.call("不要秃头啊", "99");

// 监听器1 不要秃头啊 99
// 监听器2 不要秃头啊
// 监听器3 不要秃头啊

class SyncHook {
    constructor() {
      this.taps = [];
    }
  
    //注册监听函数，这里的name其实没啥用
    tap(name, fn) {
      this.taps.push({ name, fn });
    }
  
    //执行函数
    call(...args) {
      this.taps.forEach((tap) => tap.fn(...args));
    }
  }

// 在这九个 Hook 中所注册的事件可以分为同步、异步两种执行方式，正如名称表述的那样：
//     同步表示注册的事件函数会同步进行执行
//     异步表示注册的事件函数会异步进行执行

        // 异步钩子中还可以分为两类：
        //     异步串行钩子( AsyncSeries )：可以被串联（连续按照顺序调用）执行的异步钩子函数。
        //     异步并行钩子( AsyncParallel )：可以被并联（并发调用）执行的异步钩子函数。
    
  const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
  } = require("tapable");
  
//Basic Hook : 基本类型的钩子，执行每一个注册的事件函数，并不关心每个被调用的事件函数返回值如何。
//Waterfall : 瀑布类型的钩子，如果前一个事件函数的结果 result !== undefined，则 result 会作为后一个事件函数的第一个参数（也就是上一个函数的执行结果会成为下一个函数的参数）
//Bail : 保险类型钩子，执行每一个事件函数，遇到第一个结果 result !== undefined 则返回，不再继续执行（也就是只要其中一个有结果了，后面的就不执行了）
//Loop : 循环类型钩子，不停的循环执行事件函数，直到所有函数结果 result === undefined（有点像我们小时候打单机游戏一样，只要哪一关不小心死了，就得从头再来一遍，直到所有的关卡都打过才算通关）。

//5.2、SyncBailHook
//SyncBailHook 是一个同步的、保险类型的 Hook，意思是只要其中一个有返回了，后面的就不执行了。

const { SyncBailHook } = require("tapable");

const hook = new SyncBailHook(["author", "age"]); //先实例化，并定义回调函数的形参

//通过tap函数注册事件
hook.tap("测试1", (param1, param2) => {
  console.log("测试1接收的参数：", param1, param2);
});

//该监听函数有返回值
hook.tap("测试2", (param1, param2) => {
  console.log("测试2接收的参数：", param1, param2);
  return "123";
});

hook.tap("测试3", (param1, param2) => {
  console.log("测试3接收的参数：", param1, param2);
});

//通过call方法触发事件
hook.call("不要秃头啊", "99");

//5.3、SyncWaterfallHook
const { SyncWaterfallHook } = require("tapable");

const hook = new SyncWaterfallHook(["author", "age"]); //先实例化，并定义回调函数的形参

//通过tap函数注册事件
hook.tap("测试1", (param1, param2) => {
  console.log("测试1接收的参数：", param1, param2);
});

hook.tap("测试2", (param1, param2) => {
  console.log("测试2接收的参数：", param1, param2);
  return "123";
});

hook.tap("测试3", (param1, param2) => {
  console.log("测试3接收的参数：", param1, param2);
});

//通过call方法触发事件
hook.call("不要秃头啊", "99");

// 测试1接收的参数： 不要秃头啊 99
// 测试2接收的参数： 不要秃头啊 99
// 测试3接收的参数： 123 99


//5.4、SyncLoopHook
//SyncLoopHook 是一个同步、循环类型的 Hook。循环类型的含义是不停的循环执行事件函数，直到所有函数结果 result === undefined，不符合条件就调头重新开始执行。
const { SyncLoopHook } = require("tapable");

const hook = new SyncLoopHook([]); //先实例化，并定义回调函数的形参

let count = 5;

//通过tap函数注册事件
hook.tap("测试1", () => {
  console.log("测试1里面的count:", count);
  if ([1, 2, 3].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试2", () => {
  console.log("测试2里面的count:", count);
  if ([1, 2].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试3", () => {
  console.log("测试3里面的count:", count);
  if ([1].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

//通过call方法触发事件
hook.call();


// 测试1里面的count: 5
// 测试1里面的count: 4
// 测试1里面的count: 3
// 测试2里面的count: 3
// 测试1里面的count: 2
// 测试2里面的count: 2
// 测试3里面的count: 2
// 测试1里面的count: 1
// 测试2里面的count: 1
// 测试3里面的count: 1


//5.5、AsyncParallelHook
//前面四个都是同步的 Hook，接下来开始看看异步的 Hook。
// AsyncParallelHook是一个异步并行、基本类型的 Hook，它与同步 Hook 不同的地方在于：
    //它会同时开启多个异步任务，而且需要通过 tapAsync 方法来注册事件（同步 Hook 是通过 tap 方法）
    //在执行注册事件时需要使用 callAsync 方法来触发（同步 Hook 使用的是 call 方法）
//同时，在每个注册函数的回调中，会多一个 callback 参数，它是一个函数。执行 callback 函数相当于告诉 Hook 它这一个异步任务执行完成了。

const { AsyncParallelHook } = require("tapable");

const hook = new AsyncParallelHook(["author", "age"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  setTimeout(() => {
    console.log("测试1接收的参数：", param1, param2);
    callback();
  }, 2000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  callback();
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  callback();
});

//call方法只有同步钩子才有，异步钩子得使用callAsync
hook.callAsync("不要秃头啊", "99", (err, result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", err, result);
  console.timeEnd("time");
});

// 测试2接收的参数： 不要秃头啊 99
// 测试3接收的参数： 不要秃头啊 99
// 测试1接收的参数： 不要秃头啊 99
// 这是成功后的回调 undefined undefined
// time: 2.008s

//5.6、AsyncParallelBailHook
//AsyncParallelBailHook 是一个异步并行、保险类型的 Hook，只要其中一个有返回值，就会执行 callAsync 中的回调函数。
const { AsyncParallelBailHook } = require("tapable");

const hook = new AsyncParallelBailHook(["author", "age"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "测试2有返回值啦");
  }, 2000);
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "测试3有返回值啦");
  }, 3000);
});

hook.callAsync("不要秃头啊", "99", (err, result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", result);
  console.timeEnd("time");
});

// 测试1接收的参数： 不要秃头啊 99
// 测试2接收的参数： 不要秃头啊 99
// 测试3接收的参数： 不要秃头啊 99
// 这是成功后的回调 测试2有返回值啦
// time: 2.007s


//5.7、AsyncSeriesHook
//AsyncSeriesHook 是一个异步、串行类型的 Hook，只有前面的执行完成了，后面的才会一个接一个的执行。

const { AsyncSeriesHook } = require("tapable");

const hook = new AsyncSeriesHook(["author", "age"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 2000);
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 3000);
});

hook.callAsync("不要秃头啊", "99", (err, result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", err, result);
  console.timeEnd("time");
});

// 测试1接收的参数： 不要秃头啊 99
// 测试2接收的参数： 不要秃头啊 99
// 测试3接收的参数： 不要秃头啊 99
// 这是成功后的回调 undefined undefined
// time: 6.017s

//5.8、AsyncSeriesBailHook
//AsyncSeriesBailHook 是一个异步串行、保险类型的 Hook。在串行的执行过程中，只要其中一个有返回值，后面的就不会执行了。

const { AsyncSeriesBailHook } = require("tapable");

const hook = new AsyncSeriesBailHook(["author", "age"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "123");
  }, 2000);
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 3000);
});

hook.callAsync("不要秃头啊", "99", (err, result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", result);
  console.timeEnd("time");
});

//5.9、AsyncSeriesWaterfallHook
//AsyncSeriesWaterfallHook 是一个异步串行、瀑布类型的 Hook。如果前一个事件函数的结果 result !== undefined，则 result 会作为后一个事件函数的第一个参数（也就是上一个函数的执行结果会成为下一个函数的参数）。

const { AsyncSeriesWaterfallHook } = require("tapable");

const hook = new AsyncSeriesWaterfallHook(["author", "age"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "2");
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "3");
  }, 2000);
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback(null, "4");
  }, 3000);
});

hook.callAsync("不要秃头啊", "99", (err, result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", err, result);
  console.timeEnd("time");
});

// 测试1接收的参数： 不要秃头啊 99
// 测试2接收的参数： 2 99
// 测试3接收的参数： 3 99
// 这是成功后的回调 null 4
// time: 6.012s


//其实 tap 函数就是一个收集器，当调用 tap 函数时需要将传入的这些信息进行收集，并转换成一个数组，数组里面存放着注册函数的类型type、回调函数(fn)等信息：

this.taps = [
    {
      name: "监听器1",
      type: "sync",
      fn: (param1, param2) => {
        console.log("监听器1接收参数：", name, age);
      },
    },
    {
      name: "监听器2",
      type: "sync",
      fn: (param1, param2) => {
        console.log("监听器2接收参数：", name);
      },
    },
  ]; //用来存放我们的回调函数基本信息
  
  //调用 call 函数的本质就是 按指定的类型 去执行 this.taps中的注册函数 fn，比如这里的 type: sync，就是得按同步的方式执行，那我们只需将运行代码改造成这样：

  function anonymous(param1, param2) {
    const taps = this.taps;
    
    let fn0 = taps[0].fn;
    fn0(param1, param2);
  
    let fn1 = taps[1].fn;
    fn1(param1, param2);
  }
  anonymous("不要秃头啊", "99");
  
  //如果要按照SyncBailHook（同步、保险类型：只要其中一个有返回值，后面的就不执行了 ）执行，那我们只需将运行代码改造成这样：
  function anonymous(param1, param2) {
    const taps = this.taps;
    
    let fn0 = taps[0].fn;
    let result0 = fn0(param1, param2);
  
    if (result0 !== undefined) {
      return result0;
    } else {
      let fn1 = taps[1].fn;
      let result1 = fn1(param1, param2);
  
      if (result1 !== undefined) {
        return result1;
      }
    }
  }
  anonymous("不要秃头啊", "99");
  

//如果得按照 AsyncSeriesHook（异步、串行类型：只有前面的执行完成了，后面的才会一个接一个的执行 ）执行，那我们需要将运行代码改造成这样：
  function anonymous(param1, param2, callback) {
    const taps = this.taps;
    
    let fn0 = taps[0].fn;
    fn0(param1, param2, function (err) {
      if (err) {
        //如果运行过程中报错，则直接结束
        callback(err);
      } else {
        next0();
      }
    });
  
    function next0() {
      let fn1 = taps[1].fn;
      fn1(param1, param2, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(); //在末尾执行最终的回调函数
        }
      });
    }
  }
  anonymous("不要秃头啊", "99", (err,result)=>"最终的回调函数");
  
//6.3、如何生成运行函数
//这里官方的源码中是通过 new Function() 进行创建的，先了解一下 new Function 的语法：
let func = new Function ([arg1, arg2, ...argN], functionBody);

//e.g
const sum = new Function("a,b", "return a + b");
console.log(sum(2, 6));

//这里大家可以仔细观察一下上面我们所需要的目标函数体，以 SyncHook 所需要的函数体为例：

function anonymous(param1, param2) {
    const taps = this.taps;
    
    let fn0 = taps[0].fn;
    fn0(param1, param2);
  
    let fn1 = taps[1].fn;
    fn1(param1, param2);
  }
  anonymous("不要秃头啊", "99");
  
//该函数体其实可以分为两部分：
const taps = this.taps;

//第二部分（content）：可以通过对 taps 进行遍历生成：
let fn0 = taps[0].fn;
fn0(param1, param2);

let fn1 = taps[1].fn;
fn1(param1, param2);

//现在通过new Function()生成我们想要的执行函数，就很简单了：
    // 第一步：生成形参字符串（"param1 , param2"）
    // 第二步：生成函数体中 header 部分
    // 第三步：遍历 taps，生成 content 部分
new Function(this.args().join(","), this.header() + this.content());



//按照上面的思路，首先需要通过 tap 函数进行收集工作，并将收集到的函数格式化成这样：
this.taps = [
    {
      name: "监听器1",
      type: "sync",
      fn: (param1, param2) => {
        console.log("监听器1接收参数：", name, age);
      },
    },
    {
      name: "监听器2",
      type: "sync",
      fn: (param1, param2) => {
        console.log("监听器2接收参数：", name);
      },
    },
  ]; //用来存放我们的回调函数基本信息
  

  //大致结构搭建：

  class SyncHook {
    constructor(args) {
      this.args = Array.isArray(args) ? args : []; //形参列表
      this.taps = []; //这是一个数组，用来存放注册函数的基本信息
    }
  }
  
  //这里定义了两个变量：this.args 用来存放实例化过程中传入的形参数组，this.taps 用来存放注册函数的基本信息。

//（1）taps 的收集工作
//我们之前在使用 tap 方法时是这么使用的：
hook.tap("监听器1", callback);
//这里其实是一个语法糖，写完整了是这样：
hook.tap({name:"监听器1",后面还可以有其他参数}, callback);

//因此先要做一层格式化处理：
class SyncHook {
    //省略其他
  
    tap(option, fn) {
        //如果传入的是字符串，包装成对象
        if (typeof option === "string") {
        option = { name: option };
        }
    }
 }
//接着定义 tap 函数，收集注册函数信息：
class SyncHook {
    //省略其他
    
    tap(option, fn) {
      //如果传入的是字符串，包装成对象
      if (typeof option === "string") {
        option = { name: option };
      }
  
    const tapInfo = { ...option, type: "sync", fn }; //type=sync fn是注册函数
    this.taps.push(tapInfo);
    }
  }
  
//（2）动态生成执行代码
//当调用 call 方法时，会走两个关键的步骤：先动态生成执行代码，再执行生成的代码。
//最终我们要通过 this.taps 生成如下格式的运行代码：

new Function(
    "param1 , param2",
    `  
    const taps = this.taps;
    let fn0 = taps[0].fn;
    fn0(param1, param2);
    let fn1 = taps[1].fn;
    fn1(param1, param2);
   `
  );
//这一步需要遍历 this.taps 数组，然后生成对应的函数体字符串，这里封装成一个函数 compiler 来做：
class SyncHook {
    //省略其他
  
     compile({ args, taps, type }) {
     const getHeader = () => {
       let code = "";
       code += `var taps=this.taps;\n`;
       return code;
     };
  
     const getContent = () => {
       let code = "";
       for (let i = 0; i < taps.length; i++) {
         code += `var fn${i}=taps[${i}].fn;\n`;
         code += `fn${i}(${args.join(",")});\n`;
       }
       return code;
     };
  
     return new Function(args.join(","), getHeader() + getContent());
    }
  }
  
//（3）执行生成的代码
//这里是最后一步，定义 call 方法，然后执行生成的函数体：
class SyncHook {
    //省略其他
    
    call(...args) {
      this._call = this.compile({
        taps: this.taps, //tapInfo的数组 [{name,fn,type}]
        args: this.args, //形参数组
        type: "sync",
      }); //动态创建一个call方法 这叫懒编译或者动态编译，最开始没有，用的时候才去创建执行
      return this._call(...args);
    }
  }

  //看到这里，估计有不少小伙伴要懵了，为啥这么设计啊？我们开头讲的实现不是更简单吗？
//像这样：

class SyncHook {
    constructor() {
      this.taps = [];
    }
  
    //注册监听函数，这里的name其实没啥用
    tap(name, fn) {
      this.taps.push({ name, fn });
    }
  
    //执行函数
    call(...args) {
      this.taps.forEach((tap) => tap.fn(...args));
    }
  }
  
//这么做一部分原因是为了极佳的性能考虑，比如只有在执行 call 方法时才会去动态生成执行函数，如果不执行则不处理（懒编译或者叫动态编译）。
//还有一部分原因则是为了更加灵活。别忘了，该库里面还有其他类型的 Hook，如果我们想要实现其他 Hook，只需要定义好各自的 compiler 函数就可以了。
//另外，Webpack作者也提到过为什么采用 new Function 的方案，一切都是为了性能考虑 https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Ftapable%2Fissues%2F162




