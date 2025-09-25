import 'dotenv/config';
import mongoose from "mongoose";
const dbUrl = process.env.DB_URL

export const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB connected")
    } catch (error) {
        console.log(`MongoDB failed to connect. ${error}`)
        process.exit(1)
    }
}