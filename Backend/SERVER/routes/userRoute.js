import express from 'express'
import { loginUser,SignUser } from '../controllers/usercontroller.js'

const userRouter = express.Router()

userRouter.post('/SignUP',SignUser)// creating a endpoint
userRouter.post('/Login',loginUser)// creating a endpoint

export default userRouter;