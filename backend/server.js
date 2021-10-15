import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { provideErrorHandler } from "./middlewares/errors.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

const app = express();

app.use(express.json());
app.use(provideErrorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
