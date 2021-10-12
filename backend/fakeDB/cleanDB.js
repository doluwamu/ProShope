import mongoose from "mongoose";
import fakeDB from "./FakeDB.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  },
  async () => {
    console.log("Started populating DB!");
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log("DB has been populated!");
  }
);
