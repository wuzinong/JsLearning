
//类型推论
//TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。如下面的例子

let x = 3;
//变量x的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

//最佳通用类型
//当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，
let x = [0, 1, null];

//为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
//由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型。例如：

let zoo = [new Rhino(), new Elephant(), new Snake()];
//这里，我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，因此不能推断出这个结果。 为了更正，当候选类型不能使用的时候我们需要明确的指出类型：

let zoo:Animal[] = [new Rhino(),new Elephant()]

//上下文类型
//TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。比如：
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
};

// 这个例子会得到一个类型错误，TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。 因此，就能推断出 mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置， mouseEvent参数的类型需要指定为any，这样也不会报错了。
// 如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。 重写上面的例子：
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);  //<- Now, no error is given
};

