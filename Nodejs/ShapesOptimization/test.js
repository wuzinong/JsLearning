let a = {x:1,y:2,z:3};

let b = {};
b.x = 1;
b.y=2;
b.z = 3;

console.log("a is", a);
console.log("b is", b);
console.log("a and b have same map:", %HaveSameMap(a, b));

// 结果是 false，也就是 js 引擎无法对 a b 做 Shapes 优化，这是因为 a 与 b 对象初始化的方式不同。
// 同样，在 Redux 代码中常用的 Object.assign 也有这个问题
//顺带一提 es6 的解构语法也存在同样的问题，因为 babel 将解构最终解析为 Object.assign

let c = {};
c.x = 1;
c.y=2;
c.z = 3;

console.log("b is", b);
console.log("c is", c);
console.log("b and c have same map:", %HaveSameMap(b, c));

//对这种尴尬的情况，作者的建议是对所有对象赋值时都是用 Object.assign 以保证 js 引擎可以做 Shapes 优化：
let d = Object.assign({}, {x:1, y:2, z:3});

let e = Object.assign({}, a);

console.log("d is", d);
console.log("e is", e);
console.log("d and e have same map:", %HaveSameMap(d, e)); // true

// node --allow-natives-syntax test.js