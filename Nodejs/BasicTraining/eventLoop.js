// setTimeout(function () {
//     console.log(1);
// },0);
// console.log(2);

// new Promise(function (resolve, rejected) {
//     console.log(4);
//     resolve()
// }).then(()=>{
//     console.log(5);
// }).then(()=>{
//     console.log(77)
// })
// process.nextTick(() => {
//     console.log(3);
// });
// setImmediate(function () {
//     console.log(6)
// })
// console.log('end');

setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)