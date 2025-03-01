import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import ngoRoutes from "./routes/ngo.routes.js";
import eventRoutes from "./routes/event.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

const port = process.env.PORT || 8080;

connectDB(0);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload"
    });
  }
  next(err);
});

app.use(
  cors({
    credentials: true,
    origin: ["*", "http://localhost:5173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/events", eventRoutes);

app.use(errorMiddleware);

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
