const express=require("express")
const axios=require("axios")
const Auth=require("axios")
const redis=require("../helpers/redis")
const ipRouter=express.Router()
const IpModel=require("../models/ipadresModel")


ipRouter.get("/ipinfo", Auth, async(req,res)=>{
    const ip=req.query.ip

    const redisChached=await redis.get(ip)
    if(redisChached){
      console.log("from redis")
      return res.status(201).send(redisChached)
    }else{
        const result=await axios.get(`https://ipapi.co/${ip}/json/`)
        const citydata=result.data
        redis.set(ip,JSON.stringify(citydata),"EX",60*60*6)
        console.log("form axios")
        console.log("Data frome Axios");

        await IqModel.findOneAndUpdate({UserId: req,UserID},{
            UserID: req,UserID,
            $push: {visitedIP:ip}
        },{new:true, upsert: true})
        res.status(201).send(citydata)
    }
})



module.exports=iprouter