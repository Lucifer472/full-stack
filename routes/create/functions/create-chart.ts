import { Request, Response } from "express";
import { fetchAllData, fetchHeader } from "../../../lib/sheets";
import { createObjectFromArray } from "../../../lib/utils";
import { createChart } from "../../../lib/chart";

export const createChartWithId = async (req: Request, res: Response) => {
  const { headerId, field, chartType, chartName } = await req.body;

  const header = await fetchHeader(headerId);

  if (header.success && header.success.headerData) {
    const headerArray = header.success.headerData as Array<string>;
    const headerIndex = headerArray.indexOf(field);

    const row = await fetchAllData(header.success.sheetsId);

    if (row.success) {
      const data: any = [];

      row.success.rows.forEach((r: any) => {
        data.push(r.values[headerIndex]);
      });

      const obj = createObjectFromArray(data);

      const newChart = await createChart(
        header.success.id,
        chartName,
        chartType,
        obj
      );

      if (newChart.success) {
        return res.status(200).json({ success: newChart.success });
      }
    }
  }

  return res.status(500).json({ error: "Something Went Wrong!" });
};
