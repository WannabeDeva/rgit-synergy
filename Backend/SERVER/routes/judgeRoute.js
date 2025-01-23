import express from 'express'

import { loginUser,SignUser } from '../controllers/judgecontroller.js'


const judgeRouter = express.Router()

judgeRouter.post('/SignUP',SignUser)// creating a endpoint
judgeRouter.post('/Login',loginUser)// creating a endpoint

export default judgeRouter