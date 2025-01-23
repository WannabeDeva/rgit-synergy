import express from 'express'
import { loginUser,SignUser } from '../controllers/mentorcontroller.js'

const mentorRouter = express.Router()

mentorRouter.post('/SignUP',SignUser)// creating a endpoint
mentorRouter.post('/Login',loginUser)// creating a endpoint

export default mentorRouter;