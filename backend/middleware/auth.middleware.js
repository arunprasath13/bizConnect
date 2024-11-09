import jwt from "jsonwebtoken"
import User from "../models/user.model"


export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies["jwt-linkedin"];
        if(!token){
            return res.status(401).json({message:"Unauthorised - no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unau - Invalid token"})
        }
        else{
            const user = await User.findById(decoded.userId);
            if(!user){
                return res.status(401).json({message:"user not found"})
            }
            req.user = user;
            next()
        }
    }catch(error){
      console.log("Error in protection route")
      res.status(500).json({message:"Internal server error"})
    }
}