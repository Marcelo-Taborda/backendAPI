import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import imagesRoutes from "./routes/images.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
    origin: 'https://frontenddd-production.up.railway.app',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontenddd-production.up.railway.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", imagesRoutes);
app.use("/api", userRoutes);
app.use("/api/uploads", express.static("uploads"));
dotenv.config();


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    }
    )
    .catch((error) => {
        console.log(error.message);
    }
    );
