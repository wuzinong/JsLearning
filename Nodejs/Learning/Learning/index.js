// var http = require("http");

// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/plain'});
//     res.end("Hello world");
// }).listen(1337);

// console.log("server started")

// var net = require('net');
// var server = net.createServer(function (socket) {
//   socket.write('Echo server');
//   socket.pipe(socket);
// });
// server.listen(1337, '127.0.0.1');

// var fs = require('fs');
// var data = fs.readFileSync("./test.txt");

// console.log(data);
// console.log(data.toString());
// console.log("end");


// fs.readFile('test.txt',(err,data)=>{
//     if(err) return console.error(err);

//     console.log(data.toString());
// });
// console.log("end")

//  var events = require('events');
//  var eventEmitter = new events.EventEmitter();
// // eventEmitter.on('eventName',function(){
// //     console.log("triggered");
// // });
// // eventEmitter.emit('eventName');

// var connectHandler = function connected(){
//     console.log("connection successful");
//     eventEmitter.emit('data_received');
// }

// eventEmitter.on('connection',connectHandler);

// eventEmitter.on('data_received',function(){
//     console.log('data received succesfully');
// });

// eventEmitter.emit('connection');
// console.log('program end');

// var buf = new Buffer(10);
// var buf = new Buffer([10, 20, 30, 40, 50]);
// var buf = new Buffer("testing","utf-8");

// 以下被写入到一个节点缓冲器的方法的语法：
// buf.write(string[, offset][, length][, encoding])
// 	参数
// 	下面是使用的参数的说明：
// 			string - 这是要被写入的数据串缓冲区。
// 			offset - 这是缓冲区开始的索引。默认值为0。
// 			length - 这是要写入的字节的数目。默认是 buffer.length
// 			encoding - 编码使用。 “UTF8”是默认的编码

// buf = new Buffer();
// len = buf.write('testing message');
// console.log("message length: "+len);

// buf = new Buffer(26);
// for(var i=0;i<26;i++){
//     buf[i] = i+97;
// }
// console.log(buf.toString('ascii'));
// console.log(buf.toString('ascii',0,5));
// console.log(buf.toString('utf-8',0,5));
// console.log(buf.toString(undefined,0,5));

// var buf = new Buffer('Simple test');
// var json = buf.toJSON(buf);
// console.log(json);

// var buffer1 = new Buffer('ABC');
// var buffer2 = new Buffer('ABCD');
// var result = buffer1.compare(buffer2);
// console.log(result);

// var buffer1 = new Buffer('ABC');
// var buffer2 = new Buffer(3);
// buffer1.copy(buffer2);
// console.log("buffer2 : "+buffer2.toString());

// var buffer1 = new Buffer('Test12345');
// var buffer2 = buffer1.slice(1,3);
// console.log('buffer2 content: '+ buffer2.toString());

// var fs = require('fs');
// var data = '';
// var readerStream =fs.createReadStream('test.txt');
// readerStream.setEncoding('UTF8');

// readerStream.on('data',(chunk)=>{
//      console.log('data coming');
//      console.log(chunk);
//      data += chunk;
// });

// readerStream.on('end',()=>{
//      console.log('read end:')
//      console.log(data);
// });

// readerStream.on('error',(err)=>{
//     console.log(err.stack);
// });

// console.log("Program Ended")

// var fs = require('fs');
// var data = 'simple test learning';
// var writerStream = fs.createWriteStream('test.txt');
// writerStream.write(data,'UTF8');
// writerStream.end();

// writerStream.on('finish',()=>{
//     console.log('write completed');
// });

// writerStream.on('error',(err)=>{
//     console.log(err.stack);
// });

// console.log("program ended");

// var fs = require('fs');
// var readerStream = fs.createReadStream('test.txt');
// var writerStream = fs.createWriteStream('output.txt');

// readerStream.pipe(writerStream);
// console.log('Program ended')


// var fs = require('fs');
// var zlib = require('zlib');
// fs.createReadStream('test.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('input.txt.gz'));

// console.log('file compressed');

// fs.createReadStream('input.txt.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream('input.txt'));
  
// console.log("File Decompressed.");








