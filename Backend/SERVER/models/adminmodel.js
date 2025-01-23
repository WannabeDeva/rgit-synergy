import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    
    
},{minimize:false})


const adminModel = mongoose.models.user|| mongoose.model("admin",AdminSchema)
export default adminModel