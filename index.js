import http from 'http'
import  gfName,{generateRandom} from './function.js'
import fs from 'fs'
//console.log(http)

// http.createServer((req,res)=>{
//     res.end('Hello World')
// }
// ).listen(3000,()=>{
//     console.log('Server is running on port 3000')
// }
// )

console.log(generateRandom())
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end(`<h1> The rondom number is ${generateRandom()} </h1>`)
    }
    else if(req.url==='/about'){
        res.end(fs.readFileSync('index.html'))
    }
    else{
        res.end(`${gfName} is not here`)
    }    
    
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
