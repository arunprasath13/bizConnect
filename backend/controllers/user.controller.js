import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";



export const getSuggestedConnections = async (req,res) => {
    try{
        const currentUser = await User.findOne(req.user._id).select("connections");
        const suggestedUser = await User.find({
            _id:{
                $ne:req.user._id,$nin:currentUser.connections
            }
        }).select("name username profilePicture headline").limit(3)
        res.json(suggestedUser)
    }catch(error){
        console.log("error in getting suggestions connections: ",error)
        res.status(500).json({message:"Internal server error"})
    }
}




export const getPublicProfile = async (req,res) => {
    try{
        const username = req.params.username;
        const user = await User.findOne({username:username}).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        else{
            return res.status(200).json(user)
        }
    }catch(error){
        console.log("Error in getting public profile controller: ",error);
        res.json(500).json({message:"Internal Server error"})
    }
}



export const updateProfile = async (req,res) => {
    try{
        const allowedField = [
            "name",
            "headline",
            "about",
            "location",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education"
        ];

        const updatedData = {}

        for(const field of allowedField){
            if(req.body[field]){
                updatedData[field] = req.body[field];
            }
        }

        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture)
            updatedData.profilePicture = result.secure_url
        }

        const user = await User.findByIdAndUpdate(req.user._id,{$set:updatedData},{new:true}).select("-password");
        res.json(user)
    }catch(error){
        console.log("Error in updatedProfile controller: ",error)
        res.status(500).json({message:"Server error"})
    }
}