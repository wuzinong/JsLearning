function myTypeof(obj) {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}

myTypeof([]);
myTypeof({});
myTypeof(new Date());

//原型链集成
function Animal() {
  this.colors = ['black', 'white'];
}
Animal.prototype.getColor = function () {
  return this.colors;
};
function Dog() {}
Dog.prototype = new Animal();
let dog1 = new Dog();
dog1.colors.push('brown');
let dog2 = new Dog();
console.log(dog2.colors); //[black,white,brown]
//原型链中包含的引用类型将被所有实例共享
//子类在实例化的时候不能给父类构造函数传参

//借用构造函数继承
function Animal(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = new Animal();
//方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法

//组合式继承
function Animal(name) {
  this.name = name;
  this.colors = ['black', 'white'];
}
Animal.prototype.getName = function () {
  return this.name;
};
function Dog(name, age) {
  Animal.call(this, name); //此时如果new Dog的时候Dog已经有了自己的name 和 colors属性而不是从原型链继承而来
  this.age = age;
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;
let dog1 = new Dog('test1', 2);
dog1.colors.push('brown');
let dog2 = new Dog('test2', 1);
console.log(dog2); //{name:'test2',colors:['black','white'],age:1}

//寄生式组合继承
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function inheritPrototype(child, parent) {
  let prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
inheritPrototype(Dog, Animal);

//flatten
//es5
function flatten(arr) {
  var result = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

//Deep Clone
const isObject = (target) =>
  typeof target === 'object' ||
  (typeof target === 'function' && target !== null);

function DeepClone(target, map = new WeakMap()) {
  if (map.get(target)) {
    return target;
  }
  let constructor = target.constructor;
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target);
  }
  if (isObject(target)) {
    map.set(target, true); //标记循环引用
    const cloneTarget = Array.isArray ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = DeepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}


class EventEmitter{
  constructor() {
    this.cache = {};
  }
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }
  off(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback === fn);
      if (index > 0) {
        tasks.splice(index, 1);
      }
    }
  }
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      let tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        deelte this.cache[name];
      }
    }
  }
}


//N 毫秒之后只执行一次，如果N毫秒内事件再次触发，则重新计时
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () { func.apply(context, args) }, wait);
  }
}

var node = document.getElementById("test");
function getTest(e) {
  node.innerHTML = count++;
}
node.onmousemove = debounce(getTest,1000)

//支持立即执行，返回值，取消：
functoin debounce2(func, wait, immediate){
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      //执行过则不执行
      var callNow = !timeout;
      timeout = setTimeout(function () { timeout = null }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function(){func.apply(context,args)},wait)
    }
    return result;
  }
  debounced.cancel = function () { clearTimeout(timeout); timeout = null };
  return debounced;
}

var setUserAction = debounce2(getTest, 10000, true);
node.onmousemove = setUserAction;
setUserAction.cancel();

//函数节流
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  return function () {
    var now = + new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previsous = now;
    }
  }
}

//支持取消，是否可以立即执行一次，结束调用时是否还要执行一次，不能同时将leading，trailing设置为false
function throttle2(func, wait, options) {
  var timeout, context, args, result;
  var previsous = 0;
  if (!options) options = {};
  var later = function () {
    previsous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  }

  var throttled = function () {
    var now = new Date().getTime();
    if (!previsous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timout && options.trailing !== false) {
      timeout = setTimout(later, remaining);
    }
  }
  throttled.cancel = function () {
    cleatTimeout(timeout);
    previous = 0;
    timeout = null;
  }
  return throttled;
}







