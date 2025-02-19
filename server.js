import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err))

// Define Schema & Model
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model("Form", formSchema);

// API Endpoint to Save Data
app.post("/submit", async (req, res) => {
  try {
    const newEntry = new Form(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Export for Vercel
export default app;
