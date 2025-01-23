import express from "express"
import cors from "cors"
import { ConnectDB } from "./config/db.js"
import adminRouter from "./routes/adminRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import mentorRouter from "./routes/mentorRoute.js"
import judgeRouter from "./routes/judgeRoute.js"


// app configuration

const app= express()
const port = 5000

app.use(express.json())
app.use(cors())


// db conection
ConnectDB()

// creating endpoints
app.use('/api/judge',judgeRouter)
        // app.use("/images",express.static('uploads'))
        app.use("/api/user",userRouter)
        app.use("/api/mentor",mentorRouter)
        app.use("/api/admin",adminRouter)



app.get("/",(req,res)=>{
    res.send("API WORKING ! congratulations")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

