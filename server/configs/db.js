import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );

    if (dbConnect) {
      console.log("MongoDB Database connected");
    } else {
      console.log("MongoDB Database not connected");
    }
  } catch (error) {
    console.log("Error while connecting Database");
    process.exit(1);
  }
};

export default connectDB;
