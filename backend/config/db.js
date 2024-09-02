import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("error connect to mongoDB",error);   
    }
}

export default connectDB;