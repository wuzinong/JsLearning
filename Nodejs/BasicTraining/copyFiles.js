//来自：
//http://nqdeng.github.io/7-days-nodejs/
var fs = require('fs');

//Copy file (small files)
function copy(src,dst){
    fs.writeFileSync(dst,fs.readFileSync(src));
}

//copy("./helloWorld.js","./test/copied.js");

//上边的程序拷贝一些小文件没啥问题，但这种一次性把所有文件内容都读取到内存中后再一次
//性写入磁盘的方式不适合拷贝大文件，内存会爆仓。对于大文件，我们只能读一点写一点，直到完成拷贝。
//因此上边的程序需要改造如下。
//Copy file (big files)
function bigFileCopy(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
bigFileCopy("./helloWorld.js","./test/copied.js");

// 以上程序使用fs.createReadStream创建了一个源文件的只读数据流，并使用fs.createWriteStream创建了一个目标文件的只写数据流，
// 并且用pipe方法把两个数据流连接了起来。连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。

