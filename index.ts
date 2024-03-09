import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Routes Import
import uploadRoutes from "./routes/upload/route";
import fetchRoute from "./routes/fetch/route";
import deleteRoute from "./routes/delete/route";
import updateRoute from "./routes/update/route";
import createRoute from "./routes/create/route";

// DOT ENV CONFIG
dotenv.config();

// CORS Options
const corsOptions = {
  origin: "https://full-stack-project-hardik.netlify.app",
};
// APP & MIDDLEWARE
const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://full-stack-project-hardik.netlify.app"
  );
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  next();
});

// Routes
app.use("/api/upload", uploadRoutes); // Use the routes for Uploading
app.use("/api/fetch", fetchRoute); // Use the Route for Fetching
app.use("/api/delete", deleteRoute); // Use the Route for Deleting
app.use("/api/update", updateRoute); // Use the Route for Updating
app.use("/api/create", createRoute); // Use the Route for Updating

// RUNNING APP
app.listen(PORT, () => {
  console.log("App Started On Port: " + PORT);
});
