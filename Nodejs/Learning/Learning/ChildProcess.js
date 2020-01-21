//https://segmentfault.com/a/1190000016169207
//https://github.com/forthealllight/blog/issues/24

// spawn ： 子进程中执行的是非node程序，提供一组参数后，执行的结果以流的形式返回。
// execFile：子进程中执行的是非node程序，提供一组参数后，执行的结果以回调的形式返回。
// exec：子进程执行的是非node程序，传入一串shell命令，执行后结果以回调的形式返回，与execFile
// 不同的是exec可以直接执行一串shell命令。
// fork：子进程执行的是node程序，提供一组参数后，执行的结果以流的形式返回，与spawn不同，fork生成的子进程只能执行node应用。接下来的小节将具体的介绍这一些方法。

//exec
//let cp = require('child_process');
// cp.exec('echo hello world',(err,stdout)=>{
//     console.log(stdout);
// });

//execFile
//let cp = require('child_process');
// cp.execFile('echo',['hello','world'],(err,stdout)=>{
//     if(err) return console.error(err.stack);
//     console.log(stdout);
// });

// let cp=require('child_process');
// let cat=cp.spawn('cat',['output.txt']);
// let sort=cp.spawn('sort');
// let uniq=cp.spawn('uniq');

// cat.stdout.pipe(sort.stdin);
// sort.stdout.pipe(uniq.stdin);
// uniq.stdout.pipe(process.stdout);
// console.log(process.stdout);