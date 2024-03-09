import express from "express";

import { createSheetWithColumns } from "./functions/create-sheet";
import { addHeaders } from "./functions/add-header";
import { addRow } from "./functions/add-row";
import { createChartWithId } from "./functions/create-chart";

const router = express.Router();

router.put(
  "/sheet",
  async (req, res) => await createSheetWithColumns(req, res)
);

router.put("/columns/:id", async (req, res) => await addHeaders(req, res));

router.put("/row/:id", async (req, res) => await addRow(req, res));

router.put("/chart", async (req, res) => await createChartWithId(req, res));

export default router;
