//https://juejin.cn/post/7146107198215553055#heading-6
//1.  缓存 useEffect 的引用类型依赖
import { useEffect } from "react";
export default () => {
  const msg = {
    info: "hello world",
  };
  useEffect(() => {
    console.log("msg:", msg.info);
  }, [msg]);
};

// 此时 msg 是一个对象该对象作为了 useEffect 的依赖，这里本意是 msg 变化的时候打印 msg 的信息。
// 但是实际上每次组件在render 的时候 msg 都会被重新创建，
// msg 的引用在每次 render 时都是不一样的，所以这里 useEffect 在每次render 的时候都会重新执行

//使用 useMemo
import { useEffect, useMemo } from "react";
const App = () => {
  const msg = useMemo(() => {
    return {
      info: "hello world",
    };
  }, []);
  useEffect(() => {
    console.log("msg:", msg.info);
  }, [msg]);
};

export default App;

//同理对于函数作为依赖的情况，我们可以使用 useCallback：

import { useEffect, useCallback } from "react";
const App = (props) => {
  const print = useCallback(() => {
    console.log("msg", props.msg);
  }, [props.msg]);
  useEffect(() => {
    print();
  }, [print]);
};

export default App;

//做这一步的目的是为了防止组件非必要的重新渲染造成的性能消耗，所以首先要明确组件在什么情况下会重新渲染。
// 组件的 props 或 state 变化会导致组件重新渲染
// 父组件的重新渲染会导致其子组件的重新渲染
//这一步优化的目的是：在父组件中跟子组件没有关系的状态变更导致的重新渲染可以不渲染子组件，造成不必要的浪费。
//误区一：

import { useCallback, useState } from "react";

const Child = (props) => {};
const App = () => {
  const handleChange = useCallback(() => {}, []);
  const [count, setCount] = useState(0);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1);
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} />
    </>
  );
};

export default App;

// 项目中有很多地方存在这样的代码，实际上完全不起作用，
// 因为只要父组件重新渲染，Child 组件也会跟着重新渲染，这里的 useCallback 完全是白给的。

//误区二：
import { useCallback, useState, memo } from "react";

const Child = memo((props) => {});
const App = () => {
  const handleChange = () => {};
  const [count, setCount] = useState(0);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1);
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} />
    </>
  );
};

export default App;

// 对于复杂的组件项目中会使用 memo 进行包裹，目的是为了对组件接受的 props 属性进行浅比较来判断组件要不要进行重新渲染。
// 这当然是正确的做法，但是问题出在 props 属性里面有引用类型的情况，例如数组、函数，如果像上面这个例子中这样书写，
// handleChange 在 App 组件每次重新渲染的时候都会重新创建生成，引用当然也是不一样的，那么势必会造成 Child 组件重新渲染。
// 所以这种写法也是白给的。

//正确姿势：
import { useCallback, useState, memo, useMemo } from "react";

const Child = memo((props) => {});
const App = () => {
  const [count, setCount] = useState(0);
  const handleChange = useCallback(() => {}, []);
  const list = useMemo(() => {
    return [];
  }, []);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1);
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} list={list} />
    </>
  );
};

export default App;

// 其实总结起来也很简单，memo 是为了防止组件在 props 没有变化时重新渲染，但是如果组件中存在类似于上面例子中的引用类型，
// 还是那个原因每次渲染都会被重新创建，引用会改变，所以我们需要缓存这些值保证引用不变，避免不必要的重复渲染。

//二、useContext 使用注意事项

import React, { createContext, useContext, useReducer } from "react";

const ContainerContext = createContext({ count: 0 });
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const { state, dispatch } = useContext(ContainerContext);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

function Tip() {
  return <span>计数器</span>;
}

function Container() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      <Counter />
      <Tip />
    </ContainerContext.Provider>
  );
}

export default Container;

// 使用起来非常方便，乍一看似乎都挺美好的，但是其实有不少陷阱或者误区在里面。

// useContext 的机制是使用这个 hook 的组件在 context 发生变化时都会重新渲染。
// 这样会导致一些问题，我把我遇到过的和能想到的问题总结到下面，如果有补充的可以再讨论。

//1. Provider 单独封装
// 在上面的 demo 中我们应该看到了在 Provider 中有两个组件，Counter 组件在 state 发生变化的时候需要重新渲染这个没什么问题，
// 那 Tip 组件呢，在 Tip 组件里面显然没有用到 Context 实际上是没有必要进行重新渲染的。
// 但是现在这种写法每次state变化都会导致 Provider 中所有的子组件都跟着渲染。有没有什么办法解决呢，
// 实际上也很简单，我们把状态管理单独封装到一个 Provider 组件里面，然后把子组件通过 props.children 的方式传进去
function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContainerContext.Provider>
  );
}

const App = () => {
  return (
    <Provider>
      <Counter />
      <Tip />
    </Provider>
  );
};

//2. 缓存 Provider value
// 在官方文档里面也提到了这个坑，简单说就是，如果 Provider 组件还有父组件，当 Provider 的父组件进行重渲染时，
// Provider 的value 属性每次渲染都会重新创建，
// 原理和上面 useMemo useCallback 中提到的一样，所以最好的办法是对 value 进行缓存：
function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ContainerContext.Provider value={value}>
      {props.children}
    </ContainerContext.Provider>
  );
}

//3. memo 优化直接被穿透，不再起作用
// 在开发中我们会使用 memo 来对组件进行优化，如上文中提到的，但是很多时候我们又会在使用 memo 的组件中使用 context，
// 用 context 的地方在context发生变化的时候无论如何都会发生重新渲染，
// 所以很多时候会导致 memo 优化实效，具体可以看这里的讨论，react 官方解释说设计如此，
// 同时也给出了相应的建议，我们项目中主要解决方案是把 context 往上提，然后通过属性传递，就是说我们的组件一开始是这样写的：

React.memo(()=> {
    const {count} = useContext(ContainerContext);
    return <span>{count}</span>
   })

//这个时候context更新了，memo 属于是白给，我们把 context 往上提一层，其实就可以解决这个问题：

const Child = useMemo((props)=>{
    ....
})
function Parent() {
  const {count} = useContext(ContainerContext);
  return <Child count={count} />;
}
//这样保证了 Child 组件的外部状态的变化只会来自于 props，这样当然 memo 可以完美工作了。

//4. 对 context 进行拆分整合
// context 的使用场景应该是为一组享有公共状态的组件提供便利来获取状态的变化。
//  但是随着业务代码越来越复杂，在不经意间我们就会把一些不相关的数据放在同一个context 里面。
//  这样就导致了context 中任何数据的变化都会导致使用这个 context 的组件重新 render。
//  这显然不是我们想看到的。这种情况下我们应该要对contex 进行更细粒度的拆分，把真正相关的数据整合在一起，然后再提供给组件，
//  至少这样不相关组件的状态变化不会相互影响，也就不会导致多余的重复渲染。


