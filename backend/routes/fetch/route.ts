import express from "express";

import { fetchSheetsFromDb } from "./functions/fetch-sheets";
import { fetchRowsFromDb } from "./functions/fetch-rows";

const router = express.Router();

// This is fetches all Available Sheets
router.get("/sheets", async (req, res) => await fetchSheetsFromDb(req, res));

// This is fetches all Employee from Sheets
router.get(
  "/rows/:sheetId",
  async (req, res) => await fetchRowsFromDb(req, res)
);

export default router;
