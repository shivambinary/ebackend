import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
        });
        console.log(`MongoDB connected to ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error("failed to connect to db ", error.message);
        process.exit(1);
        }
}

export default connectDB;