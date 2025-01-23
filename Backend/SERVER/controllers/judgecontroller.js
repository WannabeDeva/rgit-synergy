import judgeModel from "../models/judgemodel.js";
import fs from 'fs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req,res)=>{
    // creating a logic 
    const {email,password}=req.body;

    try{
   const user = await judgeModel.findOne({email});
    

   if(!user){
    console.log(`${user} is not signed up`)
    return res.json({"message":"user not signed up"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch){
    console.log("invalid credentials");
    return res.json({"message":"invalid credentials"})
 }
  
 const token = createToken(user._id);
 if(token){

     res.json({success:true,token})
     console.log("Judge logged in successfully")
     
    }
else{
    res.json({success:false})
    console.log("Judge log in unsuccessfull")   
}

    }catch(error){
    console.log("ERROR:",error)
    }
}


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//SIGNING UP 

const SignUser = async (req,res)=>{
    
    const{name,email,password,phone}=req.body;
    try{
        // checking if user already exits
        const exits = await judgeModel.findOne({email});
        if(exits){
            console.log(`${email} already exits`)
            return res.json({success:false,message:`User with ${email} already exits, Choose different email_id`})
        }
        // validating
        
        // if(!validator.isEmail(email)){
        //     return res.json({success:false,message:"please enter a valid email id"})
        // }
        

        if (typeof email === 'string' && email.trim()) {
            // Only call isEmail if emailAddress is a string and not empty
            if (validator.isEmail(email)) {
              console.log("Valid email address");
            } else {
              console.log("Invalid email address");
            }
          } 


        if(password.length<8){
            console.log(`the ${password} is not strong enough`)
            return res.json({success:false,message:"please enter a strong password"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new judgeModel({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone
        })


        
        //saving user in db 
        const user = await newUser.save()
        
        const token = createToken(user._id)
        res.json({success:true,token});

      
// const createToken = (userId) => {
//     // Set the expiration time (adjust as needed)
//     const expirationTime = 3600; // 1 hour in seconds
  
//     // Generate the JWT token
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: expirationTime });
//     console.log(token)
//     res.json({token:token})
//     return token;
//   };



    }catch(error){
        console.log(name,password,email,phone)
        console.log("error:",error)
        res.json({success:false,message:"error"},
        )

    }
    
}


export{loginUser,SignUser}