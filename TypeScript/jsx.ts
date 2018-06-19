
//JSX是一种嵌入式的类似XML的语法。 它可以被转换成合法的JavaScript，尽管转换的语义是依据不同的实现而定的。 JSX因 React框架而流行，但是也被其它应用所使用。 TypeScript支持内嵌，类型检查和将JSX直接编译为JavaScript。

//基本用法
// 给文件一个 .tsx扩展名
// 启用 jsx选项
//TypeScript具有三种JSX模式： preserve， react和 react-native。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 在 preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如： Babel）。 另外，输出文件会带有 .jsx扩展名。 react模式会生成 React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为 .js。 react-native相当于 preserve，它也保留了所有的JSX，但是输出文件的扩展名是 .js。

//你可以通过在命令行里使用 --jsx标记或 tsconfig.json里的选项来指定模式。
//as操作符  回想一下怎么写类型断言：
var foo = <foo>bar;
//这里我们断言 bar变量是 foo类型的。 因为TypeScript也使用尖括号来表示类型断言，JSX的语法带来了解析的困难。因此，TypeScript在 .tsx文件里禁用了使用尖括号的类型断言。
//为了弥补 .tsx里的这个功能，新加入了一个类型断言符号： as。 上面的例子可以很容易地使用 as操作符改写：

var foo = bar as foo;

//as操作符在 .ts和 .tsx里都可用，并且与其它类型断言行为是等价的。
//类型检查
//为了理解JSX的类型检查，你必须首先理解固有元素与基于值的元素之间的区别。 假设有这样一个JSX表达式 <expr />， expr可能引用环境自带的某些东西（比如，在DOM环境里的 div或 span）或者是你自定义的组件。 这是非常重要的，原因有如下两点：
//对于React，固有元素会生成字符串（ React.createElement("div")），然而由你自定义的组件却不会生成（ React.createElement(MyComponent)）。
//传入JSX元素里的属性类型的查找方式不同。 固有元素属性 本身就支持，然而自定义的组件会自己去指定它们具有哪个属性。
//TypeScript使用 与React相同的规范 来区别它们。 固有元素总是以一个小写字母开头，基于值的元素总是以一个大写字母开头。

//固有元素
//固有元素使用特殊的接口 JSX.IntrinsicElements来查找。 默认地，如果这个接口没有指定，会全部通过，不对固有元素进行类型检查。 然而，如果这个接口存在，那么固有元素的名字需要在 JSX.IntrinsicElements接口的属性里查找。 例如：
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

<foo />; // 正确
<bar />; // 错误

//在上例中， <foo />没有问题，但是 <bar />会报错，因为它没在 JSX.IntrinsicElements里指定。
//注意：你也可以在 JSX.IntrinsicElements上指定一个用来捕获所有字符串索引：
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
 }

//基于值的元素
//基于值的元素会简单的在它所在的作用域里按标识符查找。
import MyComponent from "./myComponent";

<MyComponent />; // 正确
<SomeOtherComponent />; // 错误

//有两种方式可以定义基于值的元素：
// 无状态函数组件 (SFC)
// 类组件
//由于这两种基于值的元素在JSX表达式里无法区分，因此我们首先会尝试将表达式做为无状态函数组件进行解析。如果解析成功，那么我们就完成了表达式到其声明的解析操作。如果按照无状态函数组件解析失败，那么我们会继续尝试以类组件的形式进行解析。如果依旧失败，那么将输出一个错误。
//无状态函数组件
//正如其名，组件被定义成JavaScript函数，它的第一个参数是 props对象。 我们强制它的返回值可以赋值给 JSX.Element。
interface FooProp {
    name: string;
    X: number;
    Y: number;
  }
  
  declare function AnotherComponent(prop: {name: string});
  function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name=prop.name />;
  }
  
  const Button = (prop: {value: string}, context: { color: string }) => <button>

//由于无状态函数组件是简单的JavaScript函数，所以我们还可以利用函数重载。
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
  }
  
  interface HomeProps extends ClickableProps {
    home: JSX.Element;
  }
  
  interface SideProps extends ClickableProps {
    side: JSX.Element | string;
  }
  
  function MainButton(prop: HomeProps): JSX.Element;
  function MainButton(prop: SideProps): JSX.Element {
    ...
  }
//类组件
// 我们可以限制类组件的类型。 然而，为了这么做我们需要引入两个新的术语： 元素类的类型和 元素实例的类型。
// 现在有 <Expr />， 元素类的类型为 Expr的类型。 所以在上面的例子里，如果 MyComponent是ES6的类，那么它的类类型就是这个类。 如果 MyComponent是个工厂函数，类类型为这个函数。
// 一旦建立起了类类型，实例类型就确定了，为类类型调用签名的返回值与构造签名的联合类型。 再次说明，在ES6类的情况下，实例类型为这个类的实例的类型，并且如果是工厂函数，实例类型为这个函数返回值类型。
class MyComponent {
    render() {}
  }
// 使用构造签名
var myComponent = new MyComponent();

// 元素类的类型 => MyComponent
// 元素实例的类型 => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {
    }
  }
}

// 使用调用签名
var myComponent = MyFactoryFunction();

// 元素类的类型 => MyFactoryFunction
// 元素实例的类型 => { render: () => void }

//元素的实例类型很有趣，因为它必须赋值给 JSX.ElementClass或抛出一个错误。 默认的 JSX.ElementClass为 {}，但是它可以被扩展用来限制JSX的类型以符合相应的接口。

declare namespace JSX {
    interface ElementClass {
      render: any;
    }
  }
  
  class MyComponent {
    render() {}
  }
  function MyFactoryFunction() {
    return { render: () => {} }
  }
  
  <MyComponent />; // 正确
  <MyFactoryFunction />; // 正确
  
  class NotAValidComponent {}
  function NotAValidFactoryFunction() {
    return {};
  }
  
  <NotAValidComponent />; // 错误
  <NotAValidFactoryFunction />; // 错误

  

















