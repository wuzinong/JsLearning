var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',(req,res)=>{
    console.log("Cookies: ",req.cookies);
    res.send("return message");
});

var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
})