import { Request, Response } from "express";

import { fetchAllData } from "../../../lib/sheets";

/**
 * @param req sheetId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function fetches rows From Database.
 */
export const fetchRowsFromDb = async (req: Request, res: Response) => {
  const sheetId = parseInt(req.params.sheetId);

  if (isNaN(sheetId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const rows = await fetchAllData(sheetId);

  if (rows.success) {
    return res.status(200).json({ success: rows.success });
  } else {
    return res.status(500).json({ error: "No Data Found!" });
  }
};
