
//child_process 模块提供了衍生子进程的功能，它与 popen(3) 类似，但不完全相同。 
//这个功能主要由 child_process.spawn() 函数提供：

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`输出：${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

// 默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。 
// 数据能以非阻塞的方式在管道中流通。 注意，有些程序会在内部使用行缓冲 I/O。 
// 虽然这并不影响 Node.js，但这意味着发送到子进程的数据可能无法被立即使用。

// 默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。 
// 数据能以非阻塞的方式在管道中流通。 注意，有些程序会在内部使用行缓冲 I/O。 虽然这并不影响 Node.js，
// 但这意味着发送到子进程的数据可能无法被立即使用。

// child_process.spawn() 方法会异步地衍生子进程，且不会阻塞 Node.js 事件循环。 child_process.spawnSync()
// 方法则以同步的方式提供同样的功能，但会阻塞事件循环，直到衍生的子进程退出或终止。

// 为了方便起见，child_process 模块提供了一些同步和异步的替代方法用于 child_process.spawn() 
// 和 child_process.spawnSync()。 注意，每个替代方法都是在 child_process.spawn() 或 child_process.spawnSync()
//  的基础上实现的。

// child_process.exec(): 衍生一个 shell 并在 shell 上运行命令，当完成时会传入 stdout 和 stderr 到回调函数。
// child_process.execFile(): 类似 child_process.exec()，但直接衍生命令，且无需先衍生一个 shell。
// child_process.fork(): 衍生一个新的 Node.js 进程，并通过建立一个 IPC 通讯通道来调用一个指定的模块，
// 该通道允许父进程与子进程之间相互发送信息。
// child_process.execSync(): child_process.exec() 的同步方法，会阻塞 Node.js 事件循环。
// child_process.execFileSync(): child_process.execFile() 的同步方法，会阻塞 Node.js 事件循环。
// 对于某些用例，如自动化的 shell 脚本，同步的方法 可能更方便。 大多数情况下，同步的方法会明显影响性能，
// 因为它会拖延事件循环直到衍生进程完成。


// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`输出：${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`错误：${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`子进程退出码：${code}`);
// });


// 仅限 Windows 系统
const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`子进程退出码：${code}`);
});

// 或
const { exec } = require('child_process');
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

// 文件名带有空格的脚本：
const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
// 或：
exec('"my script.cmd" a b', (err, stdout, stderr) => {
  // ...
});

//child_process.exec(command[, options][, callback])
// command <string> 要运行的命令，用空格分隔参数。
// options <Object>
    // cwd <string> 子进程的当前工作目录。
    // env <Object> 环境变量键值对。
    // encoding <string> 默认为 'utf8'。
    // shell <string> 用于执行命令的 shell。 在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。 详见 Shell Requirements 与 Default Windows Shell。
    // timeout <number> 默认为 0。
    // maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 查看警告： maxBuffer and Unicode。
    // killSignal <string> | <integer> 默认为 'SIGTERM'。
    // uid <number> 设置该进程的用户标识。（详见 setuid(2)）
    // gid <number> 设置该进程的组标识。（详见 setgid(2)）
    // windowsHide <boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.
    // callback <Function> 当进程终止时调用，并带上输出。
// error <Error>
// stdout <string> | <Buffer>
// stderr <string> | <Buffer>
// 返回: <ChildProcess>'

// 衍生一个 shell，然后在 shell 中执行 command，且缓冲任何产生的输出。
// 传入 exec 函数的 command 字符串会被 shell 直接处理，特殊字符（因 shell 而异）需要相应处理：
exec('"/path/to/test file/test.sh" arg1 arg2');
// 使用双引号这样路径中的空格就不会被解释为多个参数

exec('echo "The \\$HOME variable is $HOME"');
// 第一个 $HOME 被转义了，但第二个没有

// 注意：不要把未经检查的用户输入传入到该函数。 任何包括 shell 元字符的输入都可被用于触发任何命令的执行。

const { exec } = require('child_process');
exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// 如果提供了一个 callback 函数，则它被调用时会带上参数 (error, stdout, stderr)。 
// 当成功时，error 会是 null。 当失败时，error 会是一个 Error 实例。 error.code 属性会是子进程的退出码
// ，error.signal 会被设为终止进程的信号。 除 0 以外的任何退出码都被认为是一个错误。

// 传给回调的 stdout 和 stderr 参数会包含子进程的 stdout 和 stderr 的输出。 默认情况下，Node.js
//  会解码输出为 UTF-8，并将字符串传给回调。 encoding 选项可用于指定用于解码 stdout 和 stderr 输出的字符编码。 
//  如果 encoding 是 'buffer'、或一个无法识别的字符编码，则传入 Buffer 对象到回调函数。

// options 参数可以作为第二个参数传入，用于自定义如何衍生进程。 默认的选项是：

const defaults = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};

//child_process.execFile(file[, args][, options][, callback])
// file <string> 要运行的可执行文件的名称或路径。
// args <string[]> 字符串参数列表。
// options <Object>
    // cwd <string> 子进程的当前工作目录。
    // env <Object> 环境变量键值对。
    // encoding <string> 默认为 'utf8'。
    // timeout <number> 默认为 0。
    // maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 See caveat at maxBuffer and Unicode.
    // killSignal <string> | <integer> 默认为 'SIGTERM'。
    // uid <number> 设置该进程的用户标识。（详见 setuid(2)）
    // gid <number> 设置该进程的组标识。（详见 setgid(2)）
    // windowsHide <boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.
    // windowsVerbatimArguments <boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. Default: false.
    // callback <Function> 当进程终止时调用，并带上输出。
// error <Error>
// stdout <string> | <Buffer>
// stderr <string> | <Buffer>
// 返回: <ChildProcess>
// child_process.execFile() 函数类似 child_process.exec()，除了不衍生一个 shell。 
// 而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 child_process.exec() 更高效。

// 它支持和 child_process.exec() 一样的选项。 由于没有衍生 shell，因此不支持像 I/O 重定向和文件查找这样的行为。

// 如果调用该方法的 util.promisify() 版本，将会返回一个包含 stdout 和 stderr 的 Promise 对象。
// 在出现错误的情况下，将返回 rejected 状态的 promise，拥有与回调函数一样的 error 对象，
// 但附加了 stdout 和 stderr 属性。
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample(){
  cosnt {stdout,stderr} = await exec('ls');
  console.log('stdout:',stdout);
  console.log('stderr:',stderr);           
}

lsExample();

//child_process.fork(modulePath[, args][, options])
// modulePath <string> 要在子进程中运行的模块。
// args <Array> 字符串参数列表。
// options <Object>
    // cwd <string> 子进程的当前工作目录。
    // env <Object> 环境变量键值对。
    // execPath <string> 用来创建子进程的执行路径。
    // execArgv <Array> 要传给执行路径的字符串参数列表。默认为 process.execArgv。
    // silent <boolean> 如果为 true，则子进程中的 stdin、 stdout 和 stderr 会被导流到父进程中，否则它们会继承自父进程，详见 child_process.spawn() 的 stdio 中的 'pipe' 和 'inherit' 选项。 默认: false。
    // stdio <Array> | <string> 详见 child_process.spawn() 的 stdio。 当提供了该选项，则它会覆盖 silent。 如果使用了数组变量，则该数组必须包含一个值为 'ipc' 的子项，否则会抛出错误。 例如 [0, 1, 2, 'ipc']。
    // windowsVerbatimArguments <boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. Default: false.
    // uid <number> 设置该进程的用户标识。（详见 setuid(2)）
    // gid <number> 设置该进程的组标识。（详见 setgid(2)）
// 返回: <ChildProcess>

// child_process.fork() 方法是 child_process.spawn() 的一个特殊情况，专门用于衍生新的 Node.js 进程。 
// 跟 child_process.spawn() 一样返回一个 ChildProcess 对象。 返回的 ChildProcess 会有一个额外的内置的通信通道，
// 它允许消息在父进程和子进程之间来回传递。 详见 subprocess.send()。

// 衍生的 Node.js 子进程与两者之间建立的 IPC 通信信道的异常是独立于父进程的。 每个进程都有自己的内存，使用自己的 V8 实例。
//  由于需要额外的资源分配，因此不推荐衍生大量的 Node.js 进程。

// 默认情况下，child_process.fork() 会使用父进程中的 process.execPath 衍生新的 Node.js 实例。
// options 对象中的 execPath 属性可以替换要使用的执行路径。

// 使用自定义的 execPath 启动的 Node.js 进程，会使用子进程的环境变量 NODE_CHANNEL_FD 
// 中指定的文件描述符（fd）与父进程通信。 fd 上的输入和输出期望被分割成一行一行的 JSON 对象。

// 注意，不像 POSIX 系统回调中的 fork(2)，child_process.fork() 不会克隆当前进程。