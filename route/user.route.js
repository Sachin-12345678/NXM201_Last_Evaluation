const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register", async(req,res)=>{
   const {name, email, password} = req.body
   try{
    const isUserPresent=await Usermodel.findOne({email})
    if(isUserPresent){
        return res.status(401).send({"msg":"Allready User Registred, Login"})
    }
    bcrypt.hash(password, 8 , async(err,hash)=>{
       const newUser=new Usermodel({name,email,password:hash})
       await newUser.save()
    })
    res.status(201).send({"msg":"registration Successfull"})

   }catch(error){
    res.status(201).send({"msg":error.message})
   }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await Usermodel.findOne({email})
        if(!user){
            return res.status(401).send({"msg":"First Register"})
        }
        bcrypt.compare(password,user.password, (err, result)=>{
          if(result){
            const token=jwt.sign({"userID": user._id}, process.env.SECRET_KEY, {expiresIn: "1hr"})
          }else{
            res.status(201).send({"msg":"Login failed"})
          }
        })

    } catch (error) {
        res.status(401).send({"msg": error.message})
    }
})

module.exports=userRouter