const createStore = (reducer, state) => {
  const listeners = new Set();
  return {
    getState: () => state,
    dispatch: (action) => {
      const preState = state;
      state = reducer(state, action);
      listeners.forEach((listener) => listener(preState, state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

//打印日志：
const loggerMiddware = (store) => {
  const originDispatch = store.dispatch;
  store.dispatch = (...args) => {
    console.log('before dispatch', store.getState());
    const res = originDispatch(...args);
    console.log('after dispatch', store.getState());
    return res;
  };
};

const store = createStore(() => ({ a: 2 }), { a: 1 });

loggerMiddware(store);

store.dispatch('test');

// 输出如下：
// before dispatch: { a: 1 }
// after dispatch: { a: 2 }

//与此同时可以再多个打印时间的中间件：
const timeMiddware = (store) => {
  const originDispatch = store.dispatch;
  store.dispatch = (...args) => {
    console.log('before dispatch', new Date().getTime());
    const res = originDispatch(...args);
    console.log('after dispatch', new Date().getTime());
    return res;
  };
};

const store = createStore(() => ({ a: 2 }), { a: 1 });

loggerMiddware(store);

timeMiddware(store);

store.dispatch('test');

// 输出如下：
// before dispatch: 时间戳
// before dispatch: { a: 1 }
// after dispatch: { a: 2 }
// after dispatch: 时间戳

// 此时就能达到洋葱模型的表现。依次从外(后调用的中间件)至内(先调用的中间件)执行，
// 执行到原始的 store.dispatch，再从内(先调用的中间件)至外(后调用的中间件)执行。
// 这里由于复写的存在，先被调用的中间件，会后执行。可以整一个 applyMiddware 的方法来隐藏这一顺序问题，如下：
const applyMiddware = (store, middwares) => {
  // 逆序执行，从而隐藏执行顺序的问题
  middwares
    .slice()
    .reverse()
    .forEach((middware) => middware(store));
};

const store = createStore(() => ({ a: 2 }), { a: 1 });

// 先传入的中间件，先执行
applyMiddware(store, [timeMiddware, loggerMiddware]);

// 这样写没什么问题，但是就是不符合纯函数的优雅，loggerMiddware、timeMiddware，
// 都不是纯函数，因为他们修改了入参中的 dispatch 属性，
// 在 redux 的哲学中，这里很不纯。想要去除 store.dispatch 的显式复写，
// 只能将这个过程对用户隐藏，因为最终都是要修改的。可以在 applyMiddware 中进行复写的操作：
const applyMiddware = (store, middwares) => {
  // 逆序执行，从而隐藏执行顺序的问题
  const mids = middwares.slice().reverse();
  let dispatch = store.dispatch;
  // 关键
  mids.forEach((middware) => (dispatch = middware(store)(dispatch)));

  store.dispatch = dispatch;
};

// 本质就是将 dispatch 的赋值过程，不暴露在中间件的定义，
// 而是写在了 applyMiddware 函数中，如此写来，就需要对原来中间件的写法做出修改：

const loggerMiddware =
  (store) =>
  (dispatch) =>
  (...args) => {
    console.log('before dispatch', store.getState());
    const res = dispatch(...args);
    console.log('after dispatch', store.getState());
    return res;
  };

const timeMiddware =
  (store) =>
  (dispatch) =>
  (...args) => {
    console.log('before dispatch', new Date().getTime());
    const res = dispatch(...args);
    console.log('after dispatch', new Date().getTime());
    return res;
  };

const store = createStore(() => ({ a: 2 }), { a: 1 });

// 先传入的中间件，先执行
applyMiddware(store, [timeMiddware, loggerMiddware]);

// 这里中间件的写法其实和 redux 的写法就一致了，只是内部实现还不完全相同，
// 留作下一小结讲解。这里要说的是，不知道看到这么连续几次的箭头函数的定义，
// 有没有把一些同学转晕，我第一次看的时候还是很头疼的，怎么这么多次箭头函数的连续定义。
// 在没有消除 dispatch 的复写时，我们的中间件写起来还是非常简单，
// 而为了消除复写，突然多了几层箭头函数的连续定义，不免觉得头大。这里写在一起对比一下：
作者：芋仔
链接：https://zhuanlan.zhihu.com/p/635141861
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 复写模式下中间件的写法
const loggerMiddware = (store) => {
    const originDispatch = store.dispatch;
    // 关键注释1: 第二个箭头函数
    store.dispatch = (...args) => {
        console.log('before dispatch', store.getState());
        const res = originDispatch(...args);
        console.log('after dispatch', store.getState());
        return res;
    }
}

// 剥离了复写逻辑的写法
// 关键注释2: 三个箭头函数连续定义，但是实质上只比上述多了一层
const loggerMiddware2 = (store) => (dispatch) => (...args) => {
    console.log('before dispatch', store.getState());
    const res = dispatch(...args);
    console.log('after dispatch', store.getState());
    return res;
}


// 仔细分析下后者的写法，其实比原来的模式，看起来多了两层箭头函数，
// 第一层是 (dispatch) => xxx，这一层对应 appplyMiddware 中的 middware(store)(dispatch)，
// 下一层是 (...args) => xxx，对应 appplyMiddware 中的 dispatch = middware(store)(dispatch)
// 。但是说到底，这两个箭头函数，是把原本的 dispatch 作为入参，
// 复写的结果作为返回值，在外部通过 dispatch = middware(store)(dispatch)，
// 隐藏了原本的复写逻辑。本质上其实只是多了一层箭头函数。第二层的箭头函数，在原本的复写模式下也有，
// 只是看起来没有那么明显罢了。而之所以看起来难懂，还有一点就是这里巧妙的借助了箭头函数返回值的特性，
// 所以看起来非常简单，实际上，抛除这一特性后，代码和复写模式下差不太多：
const loggerMiddware2 = function (store) {
  function rewrite(dispatch) {
      return function (...args) {
          console.log('before dispatch', store.getState());
          const res = dispatch(...args);
          console.log('after dispatch', store.getState());
          return res;
      }
  }
  return rewrite;
}

// 真正 redux 的实现
// 上述写法上已经和 redux 中间件一致了，但是在 applyMiddware 的实现上，
// 还存在一些偏差，虽然结果一样，但是 redux 的实现更为巧妙。代码如下：

// 借助 reduce 实现 fn1, fn2, fn3 => (...args) => fn1(fn2(fn3(...args))) 的效果
const compose = (fns) => fns.reduce((a, b) => (args) => a(b(args)));

const applyMiddware = (store, middwares) => {
    //  执行一次注入 store
    const fns = middwares.map((middware) => middware(store));

    // 使用 compose 组合后，赋值修改真正的 dispatch
    store.dispatch = compose(fns)(store.dispatch);
};

// 核心就是 compose 函数，这里确实不好理解，这里面的一个关键点就是 reduce 的返回值是个函数，
// 这个函数本身并不会执行，只有当 compose(fns)(store.dispatch) 时，
// 才会真正执行。而 compose 的功能，
// 就是将入参中的一系列函数: fn1, fn2, fn3, fn4 
// 转为 (...args) => fn1(fn2(fn3(fn4(...args))))。
// 如此，当执行这个函数时，就会是从 fn4 开始执行，
// 其入参就是 store.dispatch, 返回值就是修改后的 dispatch，
// 接下来依次执行 fn3, fn2, fn1，从而生成了最终的 store.dispatch，
// 当调用 store.dispatch 时，
// 就会形成 fn1 -> fn2 -> fn3 -> fn4 -> store.dispatch -> fn4 -> fn3 -> fn2 -> fn1 的洋葱效果。
// 虽说结果和前一节的效果一样，但是这一节的 compose 函数可谓是精华中的精华，
// 相比之下省去了前一节需要的 reverse 操作。至此，基本上就是整个 redux 的精华实现了。


// 能再支持下异步吗？
// redux 最初让人迷惑比较多的地方就是异步(最初)，
// 因为 dispatch 是同步的，而往往业务中往往是发起请求前，
// dispatch loading态，请求结束后 dispatch 结束态/错误态。
// 不过想要支持异步其实也很简单，因为本身异步其实和 redux 是无关的，
// 只需要用户自己写函数，然后在不同的时机去触发同步的 dispatch 即可。
// 省略 store 的创建
// const store = createStore();
const asyncAction = () => {
  store.dispatch({ action: 'startAcyns' });
  fetch('some api').then(() => {
      store.dispatch({ action: 'acynsResolve' });
  }).catch(() => {
      store.dispatch({ action: 'acynsError' });
  })
}
// 这样写，可以用，只是看起来手动调用 store.dispatch, 
// store.getState 可能并不优雅。可以通过中间件来解决，
// 这也是 redux-thunk 的方案，dispatch 一个函数，将 store.dispatch, 
// store.getState 作为入参提供给函数，从而实现更优雅的异步操作。
const thunkMiddware = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
  }

  return dispatch(action);
}

const asyncAction = (dispatch, getState) => {
  dispatch({ action: 'startAcyns' });
   new Promise(resolve => setTimeout(() => { resolve(1) }, 1000)).then(() => {
      dispatch({ action: 'acynsResolve' });
  }).catch(() => {
      dispatch({ action: 'acynsError' });
  })
}

store.dispatch(asyncAction);


// 能让普通函数也用上中间件吗？
// redux 这个洋葱模型还是很实用的，
// 如果想给普通函数绑定上这样按照洋葱模型使用的中间件，可以吗？
// 通过之前的分析，redux 中间件的本质就是在不断的修改 store.dispatch，
// 那么其实只需要将其替换为目标的函数，即可实现。完整的代码如下：
// 给普通函数增加中间件
const createFuncWithMiddware = (func, middwares) => {
  const compose = (fns) => fns.reduce((a, b) => (args) => a(b(args)));

  const applyMiddware = (store, middwares) => {
    const fns = middwares.map((middware) => middware(store));
    store.dispatch = compose(fns)(store.dispatch);
  };


  // 按照 store 的模式直接创建一个
  const store = {
    getState: () => {},
    // dispatch 指定为目标函数
    dispatch: func,
  };

  applyMiddware(store, middwares);

  return store.dispatch;
};
//用法如下：

// 省略timeMiddware, loggerMiddware 的定义
function normalfunction(a, b) {
  console.log(a, b);
  return a + b;
}

const newFunction = createFuncWithMiddware(
  normalfunction,
  [timeMiddware, loggerMiddware],
);

newFunction(1, 2);

// 此时，普通函数也会按照洋葱模型执行中间件的一个逻辑。

// 不过其中的 store 的创建不太有必要，函数本身并不需要 getState 等方法，
// 基于此，可以对上述代码再进行简化，省略掉整体的 store。

作者：芋仔
链接：https://zhuanlan.zhihu.com/p/635141861
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

const compose = (fns) => fns.reduce((a, b) => (args) => a(b(args)));

// 省去了 store.dispatch 相关逻辑
const applyMiddware = (func, middwares) => compose(middwares)(func);

// 省去了 store => xxx 的逻辑，少了一层箭头函数的联写
const loggerMiddware = (dispatch) => (...args) => {
    console.log('before dispatch', args);
    const res = dispatch(...args);
    console.log('after dispatch', args);
    return res;
};

function normalfunction(a, b) {
  console.log(a, b);
  return a + b;
}

const newFunction = applyMiddware(normalfunction, [loggerMiddware]);

newFunction(1, 2);

// 输出
// before dispatch [1, 2]
// 1 2
// after dispatch [1, 2]

//但是，对于普通函数来讲，也存在异步的场景，如果不加以处理，loggerMiddware 便会失去其原本的作用。如下：

async function normalfunction(a, b) {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
  console.log(a, b);
  return res;
}

// 此时会输出
// before dispatch [1, 2]
// after dispatch [1, 2]
// 1s 后，输出 1 2

//这是由于中间件中没有支持异步，也很简单，但是异步具有传导性，所有的中间件都必须改为支持异步的写法：

const loggerMiddware =
  // 外层无需异步，这里就应该是同步修改原函数的行为
  (dispatch) =>
  // 此处需要支持异步
  async (...args) => {
    console.log('before dispatch', args);
    const res = await dispatch(...args);
    console.log('after dispatch', args);
    return res;
  };
