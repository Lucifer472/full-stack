import express from "express";

import { deleteSheetById } from "./functions/delete-sheets";
import { deleteEmployeeById } from "./functions/delete-employee";

const router = express.Router();

// This Deletes the sheets using sheetId
router.delete(
  "/sheet/:sheetId",
  async (req, res) => await deleteSheetById(req, res)
);

// This Deletes the employee using EmployeeId
router.delete(
  "/employee/:employeeId",
  async (req, res) => await deleteEmployeeById(req, res)
);

export default router;
