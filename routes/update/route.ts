import express from "express";

import { updateSheetNameById } from "./functions/name-update-sheet";
import { updateFieldByEmployeeId } from "./functions/field-update-rows";

const router = express.Router();

// This is Sheet Name Update Route
router.put(
  "/sheet/:sheetId",
  async (req, res) => await updateSheetNameById(req, res)
);

// This is Rows Update Route
router.put(
  "/row/:fieldId",
  async (req, res) => await updateFieldByEmployeeId(req, res)
);

export default router;
