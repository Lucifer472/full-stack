import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes Import
import uploadRoutes from "./routes/upload/route";

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

app.use("/api/upload", uploadRoutes); // Use the routes for Uploading
app.use("/api/fetch") // Use the Route for Fetching

// RUNNING APP
app.listen(PORT, () => {
  console.log("App Started On Port: " + PORT);
});
