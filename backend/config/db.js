import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("Connected to DB");
      }
    );
  } catch (eror) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
