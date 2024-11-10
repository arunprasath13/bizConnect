import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections,getPublicProfile, updateProfile,getPostById,createComment} from "../controllers/user.controller.js";
const router = express.Router();


router.post("/suggestions",protectRoute,getSuggestedConnections);
router.get("/:username",protectRoute,getPublicProfile)
router.put("/profile",protectRoute,updateProfile)
router.get("/:id",protectRoute,getPostById)
router.get("/:id/comment",protectRoute,createComment)



export default router;

