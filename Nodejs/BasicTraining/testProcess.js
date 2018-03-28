process.on("message",function(m,server){
    console.log("ender child");
    console.log(m);
    if(m==="server"){
        server.on('connection',function(socket){
             socket.end("handled by child\n");
        })
    }
})