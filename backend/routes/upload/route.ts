import express from "express";

import { createSheetsAndEmployee } from "./functions/sheet";

const router = express.Router();

router.post(
  "/sheet",
  async (req, res) => await createSheetsAndEmployee(req, res)
);

export default router;
