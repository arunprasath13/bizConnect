import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import authRoutes from "../backend/routes/auth.route.js"
import userRoutes from "../backend/routes/user.route.js"
import postRoutes from "../backend/routes/post.route.js"
import cookieParser from "cookie-parser"
// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});