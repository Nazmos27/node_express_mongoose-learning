const http = require('http')
const fs = require('fs')
const { error } = require('console')

//creating raw server

const server = http.createServer()

//listener

server.on('request',(req,res) => {
    // console.log(req,req.url,req.method);
    if(req.url === '/read-file',req.method === "GET"){
        //streaming file reading
        const readableStream = fs.createReadStream(__dirname + '/texts/read.txt') //process.cwd() do the same as __dirname
        readableStream.on('data',(buffer) => {
            res.statusCode = 200
            res.write(buffer)
        })

        readableStream.on('end',()=> {
            res.statusCode = 200
            res.end('The streaming is over')  
        })
        readableStream.on('error',(error)=> {
            console.log(error);
            res.statusCode = 500
            res.end('An error occured')  
        })
    }
})

server.listen(5000,() => {
    console.log(`server is listening on 5000`);
})