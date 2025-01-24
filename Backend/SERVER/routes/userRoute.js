import express from 'express'
import { loginUser,SignUser } from '../controllers/usercontroller.js'

const userRouter = express.Router()

userRouter.post('/SignUP',SignUser)// creating a endpoint
userRouter.post('/Login',loginUser)// creating a endpoint

userRouter.get("/user/profile", verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId, "-password"); // Exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default userRouter;