
var http = require('http');
var options = {
    host:'localhost',
    port:'8081',
    path:'index.html'
};

var callback = (res)=>{
    console.log("entering callback");
    var body ='';
    res.on('data',(data)=>{
        console.log("data event");
        body += data;

        console.log(data)
    });

    res.on('end',()=>{
        console.log(body);
    });
}

var req = http.request(options,callback);
req.end();
