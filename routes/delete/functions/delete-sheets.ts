import { Request, Response } from "express";
import { deleteSheet } from "../../../lib/sheets";

/**
 * @param req sheetsId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function Deletes Sheet From Database.
 */
export const deleteSheetById = async (req: Request, res: Response) => {
  const sheetsId = parseInt(req.params.sheetId);

  if (isNaN(sheetsId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isDeleted = await deleteSheet(sheetsId);

  if (isDeleted.success) {
    return res.status(200).json({ success: isDeleted.success });
  }

  return res.status(400).json({ error: "Something Went Wrong!" });
};
