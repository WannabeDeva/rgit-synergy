import mongoose from 'mongoose'

const JudgeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    
},{minimize:false})


const judgeModel = mongoose.models.judge|| mongoose.model("judge",JudgeSchema)
export default judgeModel