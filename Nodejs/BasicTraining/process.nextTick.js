

// process.nextTick(function(){
//     console.log("delay");
// });
// console.log("Normal1");
// console.log("Normal2");



// process.nextTick(function(){
//     console.log("nextTick延迟")
// });
// setImmediate(function(){
//     console.log("setImmediate延迟");
// });
// console.log("正常执行");



// setTimeout(function(){
//     console.log("setTimout");
//     setImmediate(function(){
//         console.log("setImmediate延迟1");
//     });
// },0);
// setImmediate(function(){
//     console.log("setImmediate延迟2");
// });
// console.log("正常执行");


// setImmediate(function(){
//     console.log("setImmediate延迟");
// });
// process.nextTick(function(){
//     console.log("nextTick延迟")
// });
// console.log("正常执行");




// process.nextTick(function(){
//     console.log("nextTick延迟执行1");
// });
// process.nextTick(function(){
//     console.log("nextTick延迟执行2");
// });
// //加入两个setImmediate()回调函数
// setImmediate(function(){
//     console.log("setImmediate延迟执行1");
//     process.nextTick(function(){
//         console.log("强势插入");
//     });
// });
// setImmediate(function(){
//     console.log("setImmediate延迟执行2");
// });
// console.log("正常执行");

//多执行几次，顺序不确定
setTimeout(function(){
    console.log("SETTIMEOUT");
},0);
setImmediate(function(){
    console.log("SETIMMEDIATE");
});

//如果将之放入I/o回调，那么是确定的,setImmediate总是会在setTimeout之前被调用
// var fs = require('fs');
// fs.readFIle('test.txt',function(){
//     setTimeout(function(){
//         console.log("Set time out")
//     });
//     setImmediate(function(){
//         console.log("Set Immediate")
//     })
// })



//setImmediate
// var i = 0;
// var start = new Date();
// function foo () {
//     i++;
//     if (i < 1000) {
//         setImmediate(foo);
//     } else {
//         var end = new Date();
//         console.log("Execution time: ", (end - start));
//     }
// }
// foo();


//setTimeout 0
// var i = 0;
// var start = new Date();
// function foo () {
//     i++;
//     if (i < 1000) {
//         setTimeout(foo, 0);
//     } else {
//         var end = new Date();
//         console.log("Execution time: ", (end - start));
//     }
// }
// foo();

// var i = 0;
// function foo(){
//   i++;
//   if(i>20){
//     return;
//   }
//   console.log("foo:"+i);
//   setTimeout(()=>{
//     console.log("setTimeout:"+i);
//   },0);
//   process.nextTick(foo);
// }   
// setTimeout(foo, 2);

// var i = 0;
// function foo(){
//   i++;
//   if(i>20){
//     return;
//   }
//   console.log("foo", i);
//   setTimeout(()=>{
//     console.log("setTimeout", i);
//   },0);
//   process.nextTick(foo);
// }

// setTimeout(foo, 2);
// setTimeout(()=>{
//   console.log("Other setTimeout");
// },2);