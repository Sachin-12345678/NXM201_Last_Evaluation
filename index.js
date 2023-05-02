const express=require("express")
const connection=require("./db")
const redisClient=require("./helpers/redis")
const {userrouter}=require("./route/user.route")


require("dotenv").config()

const PORT = process.env.PORT || 6500
const app=express()
app.use(express.json())

// app.use(userrouter)
// app.use(ok)


app.get("/", (req,res)=>{
    res.send("home page.............")
})

app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"))
})

app.listen(PORT, async ()=>{
     try{
        await connection();
        console.log("connected to db");
     }catch(err){
        console.log(err.message);
     }


    console.log("server run on port", PORT);
})