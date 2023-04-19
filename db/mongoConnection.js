import { connect } from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    const conn = await connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
