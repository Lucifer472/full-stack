import { Request, Response } from "express";
import { addColumns } from "../../../lib/sheets";

export const addHeaders = async (req: Request, res: Response) => {
  const headerId = parseInt(req.params.id);
  if (isNaN(headerId)) {
    return res.status(400).json({ error: "Invalid Header ID" });
  }

  const { columns } = await req.body;
  const header = await addColumns(headerId, columns);

  if (header.success) {
    return res.status(200).json({ success: "Columns Updated!" });
  }

  return res.status(500).json({ error: "Something Went Wrong!" });
};
