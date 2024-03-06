import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Routes Import
import uploadRoutes from "./routes/upload/route";
import fetchRoute from "./routes/fetch/route";
import deleteRoute from "./routes/delete/route";
import updateRoute from "./routes/update/route";

// DOT ENV CONFIG
dotenv.config();

// CORS Options
const corsOptions = {};

// APP & MIDDLEWARE
const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/upload", uploadRoutes); // Use the routes for Uploading
app.use("/api/fetch", fetchRoute); // Use the Route for Fetching
app.use("/api/delete", deleteRoute); // Use the Route for Deleting
app.use("/api/update", updateRoute); // Use the Route for Updating

// RUNNING APP
app.listen(PORT, () => {
  console.log("App Started On Port: " + PORT);
});
