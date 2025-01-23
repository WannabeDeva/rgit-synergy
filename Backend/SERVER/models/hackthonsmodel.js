import mongoose from 'mongoose'

const HackathonSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,required:true},
    hours:{type:Number,required:true},
    prize:{type:Number,required:true},
    requirements:{type:String,required:true},
    participants:{type:Number,required:true}
    
    
},{minimize:false})


const hackathonModel = mongoose.models.hackathons|| mongoose.model("hackathons",HackathonSchema)
export default hackathonModel