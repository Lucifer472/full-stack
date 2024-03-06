import express from "express";

import { createSheetsAndEmployee } from "./functions/create-sheet";

const router = express.Router();

// Creating Sheet Route
router.post(
  "/sheet",
  async (req, res) => await createSheetsAndEmployee(req, res)
);

export default router;
