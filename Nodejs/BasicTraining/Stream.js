var path = require('path');
var fs = require('fs');
var rs = fs.createReadStream('./helloWorld.js');

var dosomething = (chunk)=>{
    console.log(chunk);
    var str = chunk.toString('utf-8');
    console.log(str)
}
// rs.on('data',function(chunk){
//     dosomething(chunk);
// })

// rs.on('end',function(){
//     console.log("end")
// });

//上边的代码中data事件会源源不断地被触发，不管doSomething函数是否处理得过来。代码可以继续做如下改造，以解决这个问题。

// rs.on('data',function(chunk){
//     rs.pause();
//     dosomething(chunk,function(){
//         rs.resume();
//     })
// });

// rs.on('end',function(){
//     console.log("end")
// });

// 以上代码给doSomething函数加上了回调，因此我们可以在处理数据前暂停数据读取，并在处理数据后继续读取数据。

// 此外，我们也可以为数据目标创建一个只写数据流，示例如下：

// var rs = fs.createReadStream('./helloWorld.js');
// var ws = fs.createWriteStream('./test/myWriteStream.js');

// rs.on('data',function(chunk){
//     ws.write(chunk);
// });
// rs.on('end',function(){
//     ws.end();
// });

// 我们把doSomething换成了往只写数据流里写入数据后，以上代码看起来就像是一个文件拷贝程序了。
// 但是以上代码存在上边提到的问题，如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。
// 我们可以根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，
// 并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。因此代码可以改造如下：

// var rs = fs.createReadStream('./helloWorld.js');
// var ws = fs.createWriteStream('./test/myWriteStream.js');
// rs.on('data',function(chunk){
//     if(ws.write(chunk)===false){
//         rs.pause();
//     }
// });
// rs.on('end',function(){
//     console.log("end");
// });
// ws.on('drain',function(){
//     rs.resume();
// });
// 以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。
// 因为这种使用场景很多，例如上边的大文件拷贝程序，NodeJS直接提供了.pipe方法来做这件事情，其内部实现方式与上边的代码类似。

// NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：

// 文件属性读写。

// 其中常用的有fs.stat、fs.chmod、fs.chown等等。

// 文件内容读写。

// 其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

// 底层文件操作。

// 其中常用的有fs.open、fs.read、fs.write、fs.close等等。

// NodeJS最精华的异步IO模型在fs模块里有着充分的体现，例如上边提到的这些API都通过回调函数传递结果。以fs.readFile为例：


// fs.readFile(pathname, function (err, data) {
//     if (err) {
//         // Deal with error.
//     } else {
//         // Deal with data.
//     }
// });
// 如上边代码所示，基本上所有fs模块API的回调参数都有两个。
// 第一个参数在有错误发生时等于异常对象，第二个参数始终用于返回API方法执行结果。

// 此外，fs模块的所有异步API都有对应的同步版本，用于无法使用异步操作时，或者同步操作更方便时的情况。
// 同步API除了方法名的末尾多了一个Sync之外，异常对象与执行结果的传递方式也有相应变化。同样以fs.readFileSync为例：

// try {
//     var data = fs.readFileSync(pathname);
//     // Deal with data.
// } catch (err) {
//     // Deal with error.
// }



// 遍历目录
// 遍历目录是操作文件时的一个常见需求。比如写一个程序，需要找到并处理指定目录下的所有JS文件时，就需要遍历整个目录。

// 递归算法
// 遍历目录时一般使用递归算法，否则就难以编写出简洁的代码。递归算法与数学归纳法类似，通过不断缩小问题的规模来解决问题。
// 以下示例说明了这种方法。

// function factorial(n) {
//     if (n === 1) {
//         return 1;
//     } else {
//         return n * factorial(n - 1);
//     }
// }

// 上边的函数用于计算N的阶乘（N!）。可以看到，当N大于1时，问题简化为计算N乘以N-1的阶乘。当N等于1时，
// 问题达到最小规模，不需要再简化，因此直接返回1。

//了解了必要的算法后，我们可以简单地实现以下目录遍历函数
function travel(dir,callback){
    fs.readdirSync(dir).forEach(function(file){
        var pathname = path.join(dir,file);

        if(fs.statSync(pathname).isDirectory()){
            travel(pathname,callback);
        }else{
            callback(pathname);
        }
    });
}

travel('./test',function(name){
    console.log(name)
})