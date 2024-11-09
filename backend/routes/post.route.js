import express from "express"
import { getFeedPosts,createPost,deletePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();


router.get("/",protectRoute,getFeedPosts);
router.post("/create",protectRoute,createPost);
router.delete("/delete/:id",protectRoute,deletePost)



export default router;

