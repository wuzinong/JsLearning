//REFERENCE: https://segmentfault.com/a/1190000012646505
// 简单实现，参数只能从右到左传递
function createCurry(func, args) {

    var arity = func.length;
    var args = args || [];

    return function() {
        var _args = [].slice.call(arguments);
        [].push.apply(_args, args);

        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
        if (_args.length < arity) {
            return createCurry.call(this, func, _args);
        }

        // 参数收集完毕，则执行func
        return func.apply(this, _args);
    }
}

//normal
function getNewArray(array) {
    return array.map(function(item) {
        return item * 100 + '%'
    })
}

getNewArray([1, 2, 3, 0.12]);   // ['100%', '200%', '300%', '12%'];


//currying

function _map(func, array) {
    return array.map(func);
}

var _getNewArray = createCurry(_map);

var getNewArray = _getNewArray(function(item) {
    return item * 100 + '%'
})

getNewArray([1, 2, 3, 0.12]);   // ['100%', '200%', '300%', '12%'];
getNewArray([0.01, 1]); // ['1%', '100%']


//如果我们的项目中的固定操作是希望对数组进行一个过滤，找出数组中的所有Number类型的数据。借助柯里化思维我们可以这样做。

function _filter(func,array){
    return array.filter(func);
}

var _find = createCurry(_filter);
var findNumber = _find(function(item){
    if(typeof item == 'number'){
        return item;
    }
})
findNumber([1, 2, 3, '2', '3', 4]); // [1, 2, 3, 4]
// 当我们继续封装另外的过滤操作时就会变得非常简单
// 找出数字为20的子项
var find20 = _find(function(item, i) {
    if (typeof item === 20) {
        return i;
    }
})
find20([1, 2, 3, 30, 20, 100]);  // 4

// 找出数组中大于100的所有数据
var findGreater100 = _find(function(item) {
    if (item > 100) {
        return item;
    }
})
findGreater100([1, 2, 101, 300, 2, 122]); // [101, 300, 122]


// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;


function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [].slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function () {
        var _adder = function() {
            // [].push.apply(_args, [].slice.call(arguments));
            _args.push(...arguments);
            return _adder;
        };

        // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder;
    }
    // return adder.apply(null, _args);
    return adder(..._args);
}

var a = add(1)(2)(3)(4);   // f 10
var b = add(1, 2, 3, 4);   // f 10
var c = add(1, 2)(3, 4);   // f 10
var d = add(1, 2, 3)(4);   // f 10

// 可以利用隐式转换的特性参与计算
console.log(a + 10); // 20
console.log(b + 20); // 30
console.log(c + 30); // 40
console.log(d + 40); // 50

// 也可以继续传入参数，得到的结果再次利用隐式转换参与计算
console.log(a(10) + 100);  // 120
console.log(b(10) + 100);  // 120
console.log(c(10) + 100);  // 120
console.log(d(10) + 100);  // 120