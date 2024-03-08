import { Request, Response } from "express";
import { deleteChart } from "../../../lib/chart";

export const deleteChartById = async (req: Request, res: Response) => {
  const chartId = parseInt(req.params.chartId);

  if (isNaN(chartId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isDeleted = await deleteChart(chartId);

  if (isDeleted.success) {
    return res.status(200).json({ success: isDeleted.success });
  }

  return res.status(400).json({ error: "Something Went Wrong!" });
};
