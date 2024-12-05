// with the use of the express-assync-errors, you don't need
// the try/catch block to hanlde async errors in the job controller
import "express-async-errors";
import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// home page route
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// dummy route to test
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// this middleware will take care of the "request"
//which does not found any match in our server
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  // console.log(error);
  console.error("Connection error details:", error.message, error.codeName);
  process.exit(1);
}
