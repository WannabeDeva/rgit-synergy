import mongoose from "mongoose";

export const ConnectDB = async() =>{
  await  mongoose.connect('mongodb+srv://vmarri92:Password@cluster0.nbqym.mongodb.net/Rubix').then(()=>console.log("DB connected"))
}
