const mongoose=require("mongoose")

const ipSchema=mongoose.Schema({
    userID:String,
    visitedIP:Array
})

const IpModel=mongoose.model("ip",ipSchema)
module.exports=IpModel