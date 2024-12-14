import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import shoesRoutes from "./routes/shoesRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/shoes", shoesRoutes);

export default app;
