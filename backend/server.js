import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});