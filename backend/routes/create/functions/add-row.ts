import { Request, Response } from "express";
import { addRows } from "../../../lib/sheets";

export const addRow = async (req: Request, res: Response) => {
  const headerId = parseInt(req.params.id);
  if (isNaN(headerId)) {
    return res.status(400).json({ error: "Invalid Header ID" });
  }

  const { row } = await req.body;
  const rows = await addRows(headerId, row);

  if (rows.success) {
    return res.status(200).json({ success: rows.success });
  }

  return res.status(500).json({ error: "Something Went Wrong!" });
};
