import mongoose from "mongoose"
export const connectDb = async () => {
    try {
        console.log("Connecting to MongoDB at:", process.env.MONGO_URL); // Log the connection string
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};