const http=require('http');

//console.log(http)

// http.createServer((req,res)=>{
//     res.end('Hello World')
// }
// ).listen(3000,()=>{
//     console.log('Server is running on port 3000')
// }
// )

const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end('Welcome to our home page')
    }
    if(req.url==='/about'){
        res.end('Here is our short history')
    }
    
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000')
})