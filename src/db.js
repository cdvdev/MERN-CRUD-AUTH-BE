import mongoose from "mongoose";
import { config } from "./config.js";

const mongoUrl = config.MONGO_URL
export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Conected to DB");
    } catch (error) {
        console.log(error);
        console.log("tenemo un error en la base de datos");
    }
}