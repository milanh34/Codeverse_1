import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import ngoRoutes from "./routes/ngo.routes.js";
import eventRoutes from "./routes/event.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

const port = process.env.PORT || 8080;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["*", "http://localhost:5174", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/events", eventRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
