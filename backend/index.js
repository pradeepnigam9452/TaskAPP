import mongoose from "mongoose";
import express from 'express'
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import tastRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;

app.use(cors())
// routes
app.use("/users", userRoutes );  // checked in postman 

app.use("/api/tasks",tastRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
