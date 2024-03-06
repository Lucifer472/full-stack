import express from "express";

import { fetchSheetsFromDb } from "./functions/fetch-sheets";
import { fetchEmployeesFromDb } from "./functions/fetch-employee";

const router = express.Router();

// This is fetches all Available Sheets
router.get("/sheets", async (req, res) => await fetchSheetsFromDb(req, res));

// This is fetches all Employee from Sheets
router.get(
  "/employee/:sheetId",
  async (req, res) => await fetchEmployeesFromDb(req, res)
);

export default router;
