import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../Models/User.js"



const router = express.Router()

router.post('/register', async(req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username })
    if (user) {
        res.json({messgae:"User already exist"})
    }
    const hashed = await bcrypt.hash(password, 10)

    const newuser = new UserModel({
        username:username,password:hashed
    })
    await newuser.save()
    res.json({message:"User Registered Succesfully"})
   
    
    
})
router.post('/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await UserModel.findOne({ username });
     if (!user) {
       return res.json({ messgae: "User doesnt exist" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password)
    if (!isPasswordvalid) {
        return res.json({message:"Username or password Incorrect"})
    }
    const token = jwt.sign({ id: user._id }, "secret")
    res.json({token,userID: user._id})
    
    
})



export {router as userRouter}