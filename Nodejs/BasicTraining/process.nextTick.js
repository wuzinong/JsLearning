

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
// setTimeout(function(){
//     console.log("SETTIMEOUT");
// },0);
// setImmediate(function(){
//     console.log("SETIMMEDIATE");
// });
