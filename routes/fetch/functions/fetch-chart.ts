import { Request, Response } from "express";

import { fetchChart, fetchCharts } from "../../../lib/chart";

export const fetchChartFromDb = async (req: Request, res: Response) => {
  const headerId = parseInt(req.params.headerId);

  if (isNaN(headerId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const charts = await fetchChart(headerId);

  if (charts.success) {
    return res.status(200).json({ success: charts.success });
  } else {
    return res.status(500).json({ error: "No Data Found!" });
  }
};

export const fetchChartsFromDb = async (req: Request, res: Response) => {
  const charts = await fetchCharts();

  if (charts.success) {
    return res.status(200).json({ success: charts.success });
  } else {
    return res.status(500).json({ error: "No Data Found!" });
  }
};
