import { Request, Response } from "express";

import { fetchRow } from "../../../lib/sheets";

/**
 * @param req rowId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function fetch row From Database.
 */
export const fetchRowFromDb = async (req: Request, res: Response) => {
  const rowId = parseInt(req.params.rowId);

  if (isNaN(rowId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const rows = await fetchRow(rowId);

  if (rows.success) {
    return res.status(200).json({ success: rows.success });
  } else {
    return res.status(500).json({ error: "No Data Found!" });
  }
};
