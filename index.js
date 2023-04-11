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

// app.get('/',(req,res)=>{
//    const pathloc=path.resolve()

//    res.sendFile(path.join(pathloc,'index.html'))
// })
// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })



//Using the middleware to access the static files
app.use(express.static(path.join(path.resolve(),'public')))
//Using the middleware to parse the data from the form
app.use(express.urlencoded({extended:true}))


//setting up the view engine
app.set("view engine","ejs")

app.get('/',(req,res)=>{
    res.render('index',{title:"Home Page"})
})

app.get('/success',(req,res)=>{
    res.render("success")
})
const user=[];

app.get("/users",(req,res)=>{

    res.json({
        user
    })
})
app.post('/contact',async(req,res)=>{
    // console.log(req.body)
    // user.push({name:req.body.name,email:req.body.email})
    const {name,email}=req.body;
    await model.create({name,email})
    res.redirect('/success') 
})




//MongoDB
import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017',{dbName:"backend",}).then
(()=>{
    console.log("Connected to the database")
}).catch((e)=>{
    console.log(e)
})

const messageSchema=new mongoose.Schema({
    name:String,
    email:String,
})

const model=mongoose.model('user' ,messageSchema)

// app.get('/add',async(req,res)=>{
//     await model.create(user)
//     res.send("Data added")
    
// })






app.listen(5000,()=>{
    console.log("Server is listening ")
})