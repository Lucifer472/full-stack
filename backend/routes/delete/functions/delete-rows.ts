import { Request, Response } from "express";
import { deleteRows } from "../../../lib/sheets";

/**
 * @param req rowId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function Deletes Rows From Database.
 */
export const deleteRowsById = async (req: Request, res: Response) => {
  const rowId = parseInt(req.params.rowId);

  if (isNaN(rowId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isDeleted = await deleteRows(rowId);

  if (isDeleted.success) {
    return res.status(200).json({ success: isDeleted.success });
  }

  return res.status(400).json({ error: "Something Went Wrong!" });
};
