// import http from 'http'
// import  gfName,{generateRandom} from './function.js'
// import fs from 'fs'

// import path from 'path'
// //console.log(http)

// // http.createServer((req,res)=>{
// //     res.end('Hello World')
// // }
// // ).listen(3000,()=>{
// //     console.log('Server is running on port 3000')
// // }
// // )

// console.log(generateRandom())

// const server=http.createServer((req,res)=>{
//     if(req.url==='/'){
//         res.end(`<h1> The rondom number is ${generateRandom()} </h1>`)
//     }
//     else if(req.url==='/about'){
//         res.end(fs.readFileSync('index.html'))
//     }
//     else{
//         res.end(`${gfName} is not here`)
//     }    
    
// })

// server.listen(3000,()=>{
//     console.log('Server is running on port 3000')
// })



import express from "express"
import fs from "fs"
import path from "path"
const app=express()

app.get('/',(req,res)=>{
   const pathloc=path.resolve()

   res.sendFile(path.join(pathloc,'index.html'))
})
app.get('/about',(req,res)=>{
    res.send("About Page")
})

app.listen(5000,()=>{
    console.log("Server is listening ")
})