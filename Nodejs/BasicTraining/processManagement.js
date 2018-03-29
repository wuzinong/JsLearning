
//进程管理
var child_process = require("child_process");
// var util = require('util');

// function copy(source,target,callback){
//     child_process.exec(
//         util.format('cp -r %s/* %s',source,target),callback
//     );
// }
// copy('a','b',function(err){

// })


// 如何控制输入输出
// NodeJS程序的标准输入流（stdin）、
// 一个标准输出流（stdout）、一个标准错误流（stderr）
// 分别对应process.stdin、process.stdout和process.stderr，
// 第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。例如，console.log
// 可以按照以下方式实现。

function log() {
    process.stdout.write(
        util.format.apply(util, arguments) + '\n');
}

// 如何降权
// 在Linux系统下，我们知道需要使用root权限才能监听1024以下端口。
// 但是一旦完成端口监听后，继续让程序运行在root权限下存在安全隐患，因此最好能把权限降下来。以下是这样一个例子。

http.createServer(callback).listen(80, function () {
    var env = process.env,
        uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
        gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

    process.setgid(gid);
    process.setuid(uid);
});

// 上例中有几点需要注意：

// 如果是通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边。
// 如果是通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。

// process.setuid和process.setgid方法只接受number类型的参数。

// 降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。

//如何创建子进程
var child = child_process.spawn('node',['xxx.js']);

child.stdout.on('data',function(){
    console.log('stdout:'+data);
});
child.stderr.on('data',function(data){
    console.log('stderr:'+data);
});
child.on('close',function(code){
    console.log('child process existed with code:'+code);
})

// 上例中使用了.spawn(exec, args, options)方法，该方法支持三个参数。第一个参数是执行文件路径，
// 可以是执行文件的相对或绝对路径，
// 也可以是根据PATH环境变量能找到的执行文件名。第二个参数中，数组中的每个成员都按顺序对应一个命令行参数
// 。第三个参数可选，用于配置子进程的执行环境与行为。

// 另外，上例中虽然通过子进程对象的.stdout和.stderr访问子进程的输出，但通过options.stdio字段的不同配置，
// 可以将子进程的输入输出重定向到任何数据流上，或者让子进程共享父进程的标准输入输出流，或者直接忽略子进程的输入输出。

// 进程间如何通讯
// 在Linux系统下，进程之间可以通过信号互相通信。以下是一个例子。
//parent.js
var child = child_process.spawn("node",['node.js']);
child.kill('SIGTERM');

//child.js
process.on('SIGTERM',function(){
    cleanUp();
    process.exit(0);
})

// 在上例中，父进程通过.kill方法向子进程发送SIGTERM信号，子进程监听process对象的SIGTERM事件响应信号。
// 不要被.kill方法的名称迷惑了，该方法本质上是用来给进程发送信号的，进程收到信号后具体要做啥，
// 完全取决于信号的种类和进程自身的代码。

//另外，如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据。以下是一个例子。

//parent.js
var child = child_process.spawn('node',['child.js'],{
    stdio:[0,1,2,'ipc']
});
child.on('message',function(msg){
    console.log(msg)
});
child.send({hello:'hello'});

//child.js
process.on("message",function(msg){
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
})


// 可以看到，父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道，
// 之后就可以监听子进程对象的message事件接收来自子进程的消息，并通过.send方法给子进程发送消息。
// 在子进程这边，可以在process对象上监听message事件接收来自父进程的消息，并通过.send方法向父进程发送消息。
// 数据在传递过程中，会先在发送端使用JSON.stringify方法序列化，再在接收端使用JSON.parse方法反序列化。

// 如何守护子进程
// 守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，
// 保障工作进程不间断运行。以下是一种实现方式。

function spawn(mainModule){
    var worker = child_process.spawn('node',[mainModule]);

    work.on('exit',function(code){
         if(code != 0 ){
             spawn(mainModule);
         }
    })
}
spawn('worker.js');

//可以看到，工作进程非正常退出时，守护进程立即重启工作进程。
// 本章介绍了使用NodeJS管理进程时需要的API以及主要的应用场景，总结起来有以下几点：

// 使用process对象管理自身。

// 使用child_process模块创建和管理子进程。
