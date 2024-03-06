import express from "express";

import { updateSheetNameById } from "./functions/name-update-sheet";
import { updateFieldByEmployeeId } from "./functions/field-update-employee";

const router = express.Router();

// This is Sheet Name Update Route
router.put(
  "/sheet/:sheetId",
  async (req, res) => await updateSheetNameById(req, res)
);

// This is Custom Field Update Route
router.put(
  "/employee/:fieldId",
  async (req, res) => await updateFieldByEmployeeId(req, res)
);

export default router;
