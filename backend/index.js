import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// DOT ENV CONFIG
dotenv.config();

// CORS Options
const corsOptions = {};

// APP & MIDDLEWARE
const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(cors(corsOptions));

// Routes

// RUNNING APP
app.listen(PORT, () => {
  console.log("App Started On Port: " + PORT);
});
