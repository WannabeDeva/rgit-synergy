import mongoose from 'mongoose'

const MentorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    
    
},{minimize:false})


const mentorModel = mongoose.models.mentor|| mongoose.model("mentor",MentorSchema)
export default mentorModel