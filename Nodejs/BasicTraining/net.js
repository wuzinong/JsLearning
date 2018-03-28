
//net模块可用于创建Socket服务器或Socket客户端。由于Socket在前端领域的使用范围还不是很广，
// 这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。
// 首先我们来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子。这个HTTP服务器不管收到啥请求，都固定返回相同的响应。

net.createServer(function(conn){
    conn.on('data',function(data){
        conn.write([
            'Http/1.1 200 OK',
            'Content-Type:text/plain',
            'Content-Length:11',
            '',
            'Hello World'
        ].join('\n'))
    })
}).listen(80)
// 接着我们来看一个使用Socket发起HTTP客户端请求的例子。这个例子中，
// Socket客户端在建立连接后发送了一个HTTP GET请求，并通过data事件监听函数来获取服务器响应。
// 灵机一点
// 使用NodeJS操作网络，特别是操作HTTP请求和响应时会遇到一些惊喜，这里对一些常见问题做解答。

// 问： 为什么通过headers对象访问到的HTTP请求头或响应头字段不是驼峰的？

// 答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，
// 不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，
// 都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如headers['content-length']。

// 问： 为什么http模块创建的HTTP服务器返回的响应是chunked传输方式的？

// 答： 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，
// 并使用.end方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了Transfer-Encoding:
//  chunked字段，并采用chunked传输方式。但是当响应体数据长度确定时，可使用.writeHead方法在响应头里加上
//  Content-Length字段，这样做之后NodeJS就不会自动添加Transfer-Encoding字段和使用chunked传输方式。

// 问： 为什么使用http模块发起HTTP客户端请求时，有时候会发生socket hang up错误？

// 答： 发起客户端HTTP请求前需要先创建一个客户端。http模块提供了一个全局客户端http.globalAgent，
// 可以让我们使用.request或.get方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，
// 当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生socket hang up错误。解决方法也很简单，
// 通过http.globalAgent.maxSockets属性把这个数字改大些即可。另外，https模块遇到这个问题时也一样通过
// https.globalAgent.maxSockets属性来处理。

