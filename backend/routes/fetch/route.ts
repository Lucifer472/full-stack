import express from "express";

import { fetchSheetsFromDb } from "./functions/fetch-sheets";
import { fetchRowsFromDb } from "./functions/fetch-rows";
import { fetchRowFromDb } from "./functions/fetch-row";

const router = express.Router();

// This is fetches all Available Sheets
router.get("/sheets", async (req, res) => await fetchSheetsFromDb(req, res));

// This is fetches all rows from Sheets
router.get(
  "/rows/:sheetId",
  async (req, res) => await fetchRowsFromDb(req, res)
);

// This is fetches all row from Sheets
router.get("/row/:rowId", async (req, res) => await fetchRowFromDb(req, res));

export default router;
