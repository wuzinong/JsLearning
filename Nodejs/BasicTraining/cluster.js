
// Node.js在单个线程中运行单个实例。 用户(开发者)为了使用现在的多核系统，有时候,
// 用户(开发者)会用一串Node.js进程去处理负载任务。
// cluster 模块允许简单容易的创建共享服务器端口的子进程。

const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`Master process ${process.pid} is now running`);

    //child processes
    for(let i=0;i<numCpus;i++){
        cluster.fork();
    }

    cluster.on('exit',(worker,code,signal)=>{
        console.log(`process ${worker.process.pid} has exited`);
    });
}else{
     // 工作进程可以共享任何 TCP 连接。
     // 在本例子中，共享的是一个 HTTP 服务器。
     http.createServer((req,res)=>{
         res.writeHead(200);
         res.end('hello');
     }).listen(8000);
     cosnole.log(`Process ${process.pid} has started`)
}