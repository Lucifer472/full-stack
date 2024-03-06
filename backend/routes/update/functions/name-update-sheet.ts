import { Request, Response } from "express";
import { updateNameSheet } from "../../../lib/sheets";

/**
 * @param req sheetId and sheetName for Updating Data
 * @param res Success Message or Error Message.
 * @returns
 * This Function Updated Name of the Sheet.
 */
export const updateSheetNameById = async (req: Request, res: Response) => {
  const sheetId = parseInt(req.params.sheetId);
  const { sheetName } = req.body;

  if (isNaN(sheetId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isUpdated = await updateNameSheet(sheetId, sheetName);

  if (isUpdated.success) {
    return res.status(200).json({ success: isUpdated.success });
  }

  return res.status(400).json({ error: isUpdated.error });
};
