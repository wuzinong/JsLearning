
//模块
//关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。
// 从ECMAScript 2015开始，JavaScript引入了模块的概念。TypeScript也沿用这个概念。
// 模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export形式之一导出它们。 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。
// 模块是自声明的；两个模块之间的关系是通过在文件级别上使用imports和exports建立的。
// 模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 大家最熟知的JavaScript模块加载器是服务于Node.js的 CommonJS和服务于Web应用的Require.js。
// TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

// 导出声明
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。

//Validation.ts

export interface StringValidator {
    isAcceptable(s: string): boolean;
}

//ZipCodeValidator.ts
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

//导出语句
//导出语句很便利，因为我们可能需要对导出的部分重命名，所以上面的例子可以这样改写：
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

//重新导出
//我们经常会去扩展其它模块，并且只导出那个模块的部分内容。 重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量。
//ParseIntBasedZipCodeValidator.ts
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

// 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";

//或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。
//AllValidators.ts
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator

//导入
//模块的导入操作与导出一样简单。 可以使用以下 import形式之一来导入其它模块中的导出内容。
//导入一个模块中的某个导出内容
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();

//可以对导入内容重命名
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

//将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

//具有副作用的导入模块
//尽管不推荐这么做，一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。 使用下面的方法来导入这类模块：
import "./my-module.js";

//默认导出
//每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出。
//default导出十分便利。 比如，像JQuery这样的类库可能有一个默认导出 jQuery或$，并且我们基本上也会使用同样的名字jQuery或$导出JQuery。
//JQuery.d.ts
declare let $:JQuery;
export default $;

//App.ts
import $ from "JQuery";
$("button.continue").html( "Next Step..." );

//类和函数声明可以直接被标记为默认导出。 标记为默认导出的类和函数的名字是可以省略的。
//ZipCodeValidator.ts
export default class ZipCodeValidator{
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s:string){
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}
//Test.ts
import validator from "./ZipCodeValidator";
let myValidator = new validator();

//或者
//StaticZipCodeValidator.ts
const numberRegexp = /^[0-9]+$/;
export default function(s:string){
    return s.length === 5 && numberRgexp.test(s);
}

//Test.ts
import validate from "./StaticZipCodeValidator";
let strings = ["Hello","98052","101"];
// Use function validate
strings.forEach(s=>{
  console.log(validate(s));
});

//default导出也可以是一个值
//OneTwoThree.ts
export default "123";

//Log.ts
import num from "./OneTwoThree";
console.log(num);//123

//export = 和 import = require()
//CommonJS和AMD都有一个exports对象的概念，它包含了一个模块的所有导出内容。
//它们也支持把exports替换为一个自定义对象。 默认导出就好比这样一个功能；然而，它们却并不相互兼容。 TypeScript模块支持 export =语法以支持传统的CommonJS和AMD的工作流模型。
//export =语法定义一个模块的导出对象。 它可以是类，接口，命名空间，函数或枚举。
//若要导入一个使用了export =的模块时，必须使用TypeScript提供的特定语法import module = require("module")。

//ZipCodeValidator.ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator{
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }  
}
export = ZipCodeValidator;

//Test.ts
import zip = require("./ZipCodeValidator");
// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new zip();

// Show whether each string passed each validator
strings.forEach(s => {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});

//生成模块代码
//根据编译时指定的模块目标参数，编译器会生成相应的供Node.js (CommonJS)，Require.js (AMD)，UMD，SystemJS或ECMAScript 2015 native modules (ES6)模块加载系统使用的代码。 想要了解生成代码中 define，require 和 register的意义，请参考相应模块加载器的文档。

//SimpleModule.ts
import m = require("mod");
export let t = m.something + 1;

//AMD / RequireJS SimpleModule.js
define(["require", "exports", "./mod"], function (require, exports, mod_1) {
    exports.t = mod_1.something + 1;
});

//CommonJS / Node SimpleModule.js
let mod_1 = require("./mod");
exports.t = mod_1.something + 1;

//UMD SimpleModule.js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        let v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./mod"], factory);
    }
})(function (require, exports) {
    let mod_1 = require("./mod");
    exports.t = mod_1.something + 1;
});

//System SimpleModule.js
System.register(["./mod"],function(exports_1){
    let mod_1;
    let t;
    return {
      setters:[
          function(mod_1_1){
              mode_1 = mod_1_1;
          }
      ],
      execute:function(){
          exports_1("t",t=mod_1.something+1);
      }
    }
})
//Native ECMAScript 2015 modules SimpleModule.js
import { something } from "./mod";
export let t = something + 1;

//简单示例
//下面我们来整理一下前面的验证器实现，每个模块只有一个命名的导出。
//为了编译，我们必需要在命令行上指定一个模块目标。对于Node.js来说，使用--module commonjs； 对于Require.js来说，使用--module amd。比如：


