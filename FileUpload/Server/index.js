const http = require("http");
const server = http.createServer();

server.on("request",async (req,res)=>{
    res.setHeader("Access-Control-allow-Origin")
})