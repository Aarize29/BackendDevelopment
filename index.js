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
import path from "path"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
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

app.use(cookieParser())


//setting up the view engine
app.set("view engine","ejs")

const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies
    if(token){

       const decoded= jwt.verify(token,"secret")
        //console.log(decoded)
        req.user=await User.findById(decoded.id)


        next()
    }
    else{
        res.redirect('/login')
    }
}

app.get('/',isAuthenticated,(req,res)=>{
    //console.log(req.user)
    res.render('logout',{name:req.user.name,email:req.user.email})
})
app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async (req,res)=>{
    
   let user=await User.findOne({email:req.body.email})
    if(user){
        
        // return console.log("User not found")
        return res.redirect('/login')
    } 

    const hashedPassword=await bcrypt.hash(req.body.password,10)
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    const token=jwt.sign({id:user._id},"secret")

    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+1000*60)
    })
    res.redirect('/')
})
 
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{

    const {email,password}=req.body;
    let user=await User.findOne({email})

    if(!user){
        return res.redirect("/register")
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.render("login",{email,message:"Invalid Credentials"})
    }
    
    const token=jwt.sign({id:user._id},"secret")

    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+1000*60)
    })
    res.redirect('/')
})
app.get('/logout',(req,res)=>{
    res.clearCookie('token',null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.redirect('/')
})

//MongoDB
import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017',{dbName:"backend",}).then
(()=>{
    console.log("Connected to the database")
}).catch((e)=>{
    console.log(e)
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User=mongoose.model('user' ,userSchema)

// app.get('/add',async(req,res)=>{
//     await model.create(user)
//     res.send("Data added")
    
// })






app.listen(5000,()=>{
    console.log("Server is listening ")
})