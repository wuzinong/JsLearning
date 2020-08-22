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
// console.log(buffer1);
// console.log(buffer2);
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


// var fs = require('fs');
// fs.readFile('test.txt',(err,data)=>{
//     if(err) return console.error(err);
//     console.log('Asynchronous read:',data.toString())
// });
// var data = fs.readFileSync('test.txt');
// console.log('Synchronous read:',data.toString());
// console.log("Program end")




//var fs = require("fs");

// console.log("going to open file")
// fs.open('test.txt','r+',(err,fd)=>{
//     if(err) return console.log(err);
//     console.log("File opened successfully")
// });

// console.log("Going to get file info!");
// fs.stat('test.txt',(err,stats)=>{
//     if(err) return console.err(err);

//     console.log(stats);
//     console.log("Got file info successfully");

//     console.log("isFile?"+stats.isFile());
//     console.log("isDirectory?"+stats.isDirectory());
// })



// var fs = require('fs');
// console.log("Going to write into existing file");
// fs.writeFile('output.txt','Simple learning from writeFile',(err)=>{
//     if(err) return console.error(err);
//     console.log("Data written successfully");
//     console.log("Let's read newly written data");
//     fs.readFile('output.txt',(err,data)=>{
//         if(err) return console.error(err);
//         console.log("Asynchronous read: "+data.toString());
//     })
// })



// var fs = require('fs');
// var buf = new Buffer(1024);

// console.log("Going to open an existing file");
// fs.open('test.txt','r+',(err,fd)=>{
//     if(err) return console.error(err);
//     console.log("File opened successfully");
//     console.log("Going to read the file");

//     fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
//         if(err) console.log(err);
//         console.log(bytes+" bytes read");
//         if(bytes>0){
//             console.log(buf.slice(0,bytes).toString())
//         }
//     })
// })


// var fs = require('fs');
// var buf = new Buffer(1024);
// console.log("Going to open an existing file");
// fs.open('test.txt','r+',(err,fd)=>{
//     if(err) return console.error(err);
//     console.log("File opened successfully");
//     console.log("Going to truncate the file after 10 bytes");

//     fs.ftruncate(fd,10,(err)=>{
//         if(err) console.log(err);
//         console.log("File truncated successfully.");
//         console.log("Going to read the same file");

//         fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
//             if(err) console.log(err);
//             if(bytes>0){
//                 console.timeLog(buf.slice(0,bytes).toString());
//             }
//             fs.close(fd,(err)=>{
//                 if(err) console.log(err);
//                 console.log("File closed successfully")
//             })
//         })
//     })
// })


// var fs = require('fs');
// console.log("going to deelte an existing file");
// fs.unlink('input.txt.gz',(err)=>{
//     if(err) return console.error(err);
//     console.log("File deleted successfully")
// })


// var fs = require('fs');
// var path = require('path');
// console.log("Going to create directory /tmp/test");
// fs.mkdir(path.resolve('./tmp/test'),(err)=>{
//     if(err) return console.error(err);
//     console.log("Directory created successfully")
// })



// var fs = require('fs');
// var path = require('path');
// console.log("Going to read direcotry /tmp");
// fs.readdir(path.resolve("./tmp/"),(err,files)=>{
//     if(err) return console.error(err);
//     files.forEach((file)=>{
//         console.log(file);
//     })
// });


// var  fs = require('fs');
// var path= require('path');
// console.log("Going to delete directotyr /tmp");
// fs.rmdir(path.resolve('./tmp/'),(err)=>{
//     if(err) return console.error(err);
//     console.log("Going to read directory /tmp");
//     fs.readdir(path.resolve("./tmp"),(err,file)=>{
//         if(err) return console.error(err);
//         files.forEach((file)=>{
//             console.log(file);
//         })
//     })
// })

// console.log(__dirname)
// console.log(__filename)


// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// http.createServer((req,res)=>{
//     var pathname = url.parse(req.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     fs.readFile(pathname.substr(1),(err,data)=>{
//         if(err){
//             console.log(err);
//             res.writeHead(404,{'content-type':'text/html'});
//         }else{
//             res.writeHead(200,{'content-type':'text/html'});
//             res.write(data.toString());
//         }
//         res.end();
//     })
// }).listen(8081);
// console.log('Server runing at http://127.0.0.1:8081')


// var assert = require('assert');
// assert.throws(()=>{
//     throw new Error('Wrong value')
// },Error);


// const readline = require('readline');
// var rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// });
// rl.question("What do you think of node.js?",(answer)=>{
//     console.log("Thanks for the feedback",answer);
//     rl.close();
// })


// var child = require('child_process').fork('child.js');

// var server = require('net').createServer();
// server.on('connection',(socket)=>{
//     socket.end("handled by parent");
//     // if(socket.remoteAddress==='127.0.0.1'){
//     //     special.send('socket',socket);
//     // }

//     // normal.send('socket',socket);
// });

// server.listen(1337,()=>{
//     child.send('server',server);
// });

// //Child.js
// process.on('message',(m,server)=>{
//     if(m==='server'){
//         server.on('connection',(socket)=>{
//             socket.end('handled by child');
//         })
//     }
// })

// var numCPUs = require('os').cpus().length;
// console.log(numCPUs);

// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died');
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case its a HTTP server
//   http.createServer(function(req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(8000);
// }

// var StringDecoder = require('string_decoder').StringDecoder;
// var decoder = new StringDecoder('utf8');

// var cent = new Buffer([0xC2, 0xA2]);
// console.log(decoder.write(cent));

// var euro = new Buffer([0xE2, 0x82, 0xAC]);
// console.log(decoder.write(euro));


// var os = require('os');
// console.log(os.platform());
// console.log(os.type());
// console.log(os.cpus());


// var dns = require('dns');
// dns.resolve4('www.g.cn',(err,address)=>{
//     console.log('address:'+JSON.stringify(address));

//     address.forEach((a)=>{
//         dns.reverse(a,(err,hostnames)=>{
//             console.log('revers for '+a+":"+JSON.stringify(hostnames))
//         })
//     })
// })

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('data: ' + chunk);
//   }
// });

// process.stdin.on('end', function() {
//   process.stdout.write('end');
// });



//https://segmentfault.com/a/1190000016169207
//exec

// const fs = require('fs');
// const child_process = require('child_process');

// for(var i=0;i<3;i++){
//   var workerProcess = child_process.exec('node support.js '+i,(error,stdout,stderr)=>{
//     if(error){
//       console.log(error.stack);
//       console.log('Error code: '+error.code);
//       console.log('signal recevived:'+ error.signal);
//     }
//     console.log('stdout: '+stdout);
//     console.log('stderr: '+stderr);
//   });
//   workerProcess.on('exit',(code)=>{
//     console.log("child process exits, code: "+code);
//   })
// }
  

//spawn

// const fs = require('fs');
// const child_process = require('child_process');
// for(var i=0;i<3;i++){
//   var workerProcess = child_process.spawn('node',['support.js',i]);
//   workerProcess.stdout.on('data',(data)=>{
//     console.log('stdout: '+data);
//   });
//   workerProcess.stderr.on('data',(data)=>{
//     console.log('stderr: '+data);
//   });
//   workerProcess.on('close', function (code) {
//     console.log('子进程已退出，退出码 '+code);
//  });
// }


//https://segmentfault.com/a/1190000016169207
//https://github.com/forthealllight/blog/issues/24

// let cp = require('child_process');
// cp.exec("echo hello world",(err,stdout)=>{
//   console.log(stdout);
// })