import express from "express";

import { deleteSheetById } from "./functions/delete-sheets";
import { deleteRowsById } from "./functions/delete-rows";
import { deleteChartById } from "./functions/delete-chart";

const router = express.Router();

// This Deletes the sheets using sheetId
router.delete(
  "/sheet/:sheetId",
  async (req, res) => await deleteSheetById(req, res)
);

// This Deletes the Row using rowId
router.delete(
  "/row/:rowId",
  async (req, res) => await deleteRowsById(req, res)
);

router.delete(
  "/chart/:chartId",
  async (req, res) => await deleteChartById(req, res)
);

export default router;
