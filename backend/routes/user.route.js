import express from "express"
// import { signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections,getPublicProfile, updateProfile} from "../controllers/user.controller.js";
const router = express.Router();


router.post("/suggestions",protectRoute,getSuggestedConnections);
router.get("/:username",protectRoute,getPublicProfile)
router.put("/profile",protectRoute,updateProfile)



export default router;
