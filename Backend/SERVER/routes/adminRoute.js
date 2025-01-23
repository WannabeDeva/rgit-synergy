import express from 'express'
import { loginUser,SignUser } from '../controllers/admincontroller.js'

const adminRouter = express.Router()

adminRouter.post('/SignUP',SignUser)// creating a endpoint
adminRouter.post('/Login',loginUser)// creating a endpoint

export default adminRouter;