import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    //process.env.MONGO_URL ||
    const conn = await mongoose.connect ('mongodb://127.0.0.1/ecommerce2', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log (`mongod connected with server: ${conn.connection.host}`);
  } catch (error) {
    console.log (`error in Mongodb connection: ${error}`);
  }
};

export default connectDB;
