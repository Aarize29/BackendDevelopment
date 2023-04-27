import express from 'express';
import mongoose from "mongoose"
const app=express()

mongoose.connect('mongodb://127.0.0.1:27017',{dbName:"backendapi",}).then
(()=>{
    console.log("Connected to the database")
}).catch((e)=>{
    console.log(e)
})

const schema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User=mongoose.model("User",schema)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

//Api to accept data from the user
app.get("/users/all", async (req,res)=>{

   const users=await User.find({})

    res.json({
        success:true,
        users
    //     users:
    //     [
    //     // {name:"John",age:20},
    //     // {name:"Jane",age:21},
    //     // {name:"Jack",age:22},
    // ]
    })
})

app.use(express.json())

//Api to create a new user
app.post('/users/new',async (req,res)=>{

    try {
        
    const {name,email,password}=req.body
    await User.create({
        name,
        email,
        password,
    })

    res.json({
        success:true,
        message:"User created successfully",
    })
    } catch (error) {
        console.log(error)
    }

})

// app.get('/userid',async (req,res)=>{
//     try{
//         const {id}=req.id
//     const user= await User.findById(id)

//     res.json({
//         success:true,
//         user,
//     })
//     }
//     catch(error){
//         console.log(error)
//     }
// })

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})