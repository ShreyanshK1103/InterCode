import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        if(!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in environment variables");
        }
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connect to the Mongo DB", conn.connection.host);
    } catch (err) {
        console.error("Error Connecting to Mongo DB", err);
        process.exit(1) // 0 Means success, 1 Means Failure
    }
}