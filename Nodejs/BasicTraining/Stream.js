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
// function travel(dir,callback){
//     fs.readdirSync(dir).forEach(function(file){
//         var pathname = path.join(dir,file);

//         if(fs.statSync(pathname).isDirectory()){
//             travel(pathname,callback);
//         }else{
//             callback(pathname);
//         }
//     });
// }

// travel('./test',function(name){
//     console.log(name)
// });

//异步遍历
// function travel(dir, callback, finish) {
//     fs.readdir(dir, function (err, files) {
//         (function next(i) {
//             if (i < files.length) {
//                 var pathname = path.join(dir, files[i]);

//                 fs.stat(pathname, function (err, stats) {
//                     if (stats.isDirectory()) {
//                         travel(pathname, callback, function () {
//                             next(i + 1);
//                         });
//                     } else {
//                         callback(pathname, function () {
//                             next(i + 1);
//                         });
//                     }
//                 });
//             } else {
//                 finish && finish();
//             }
//         }(0));
//     });
// }

//文本编码
// 使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。
// 我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。
// 在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。
// BOM的移除
// BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：

//     Bytes      Encoding
// ----------------------------
//     FE FF       UTF16BE
//     FF FE       UTF16LE
//     EF BB BF    UTF8

// 因此，我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM，以及使用哪种Unicode编码。
// 但是，BOM字符虽然起到了标记文件编码的作用，其本身却不属于文件内容的一部分，如果读取文本文件时不去掉BOM，
// 在某些使用场景下就会有问题。例如我们把几个JS文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器JS语法错误。
// 因此，使用NodeJS读取文本文件时，一般需要去掉BOM。例如，以下代码实现了识别和去除UTF8 BOM的功能。

function readText(pathname){
    var bin = fs.readFileSync(pathname);
    if(bin[0]===0xEF && bin[1]===0xBB && bin[2]==0xBF){
        bin = bin.slice(3);
    }
    return bin.toString('utf-8');
}

//单字节编码
// 有时候，我们无法预知需要读取的文件采用哪种编码，因此也就无法指定正确的编码。
// 比如我们要处理的某些CSS文件中，有的用GBK编码，有的用UTF8编码。虽然可以一定程度可以根据文件的字节内容猜测出文本编码，
// 但这里要介绍的是有些局限，但是要简单得多的一种技术。

// 首先我们知道，如果一个文本文件只包含英文字符，比如Hello World，那无论用GBK编码或是UTF8编码读取这个文件都是没问题的。
// 这是因为在这些编码下，ASCII0~128范围内字符都使用相同的单字节编码。

// 反过来讲，即使一个文本文件中有中文等字符，如果我们需要处理的字符仅在ASCII0~128范围内，
// 比如除了注释和字符串以外的JS代码，我们就可以统一使用单字节编码来读取文件，不用关心文件的实际编码是GBK还是UTF8。
// 以下示例说明了这种方法。
// 1. GBK编码源文件内容：
//     var foo = '中文';
// 2. 对应字节：
//     76 61 72 20 66 6F 6F 20 3D 20 27 D6 D0 CE C4 27 3B
// 3. 使用单字节编码读取后得到的内容：
//     var foo = '{乱码}{乱码}{乱码}{乱码}';
// 4. 替换内容：
//     var bar = '{乱码}{乱码}{乱码}{乱码}';
// 5. 使用单字节编码保存后对应字节：
//     76 61 72 20 62 61 72 20 3D 20 27 D6 D0 CE C4 27 3B
// 6. 使用GBK编码读取后得到内容：
//     var bar = '中文';

// 这里的诀窍在于，不管大于0xEF的单个字节在单字节编码下被解析成什么乱码字符，
// 使用同样的单字节编码保存这些乱码字符时，背后对应的字节保持不变。

// NodeJS中自带了一种binary编码可以用来实现这个方法，因此在下例中，我们使用这种编码来演示上例对应的代码该怎么写。

function replace(pathname){
    var str = fs.readFileSync(pathname,'binary');
    str = replace('foo','bar');
    fs.writeFileSync(pathname,str,'binary')
}
 

// var child = require('child_process').fork('./testProcess.js');
// var server = require('net').createServer();
// server.on('connection',function(socket){
//     socket.end("handled by parent\n");
// });
// server.listen(1337,function(){
//     child.send('server',server)
// });