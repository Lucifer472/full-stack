import { Request, Response } from "express";
import { createHeader, createSheets } from "../../../lib/sheets";

export const createSheetWithColumns = async (req: Request, res: Response) => {
  const { sheetName, columns } = await req.body;

  const sheet = await createSheets(sheetName);
  if (sheet.success) {
    const header = await createHeader(sheet.success.id, columns);

    if (header.success) {
      return res.status(200).json({ success: sheet.success });
    }

    return res.status(500).json({ error: "Something Went Wrong!" });
  }

  return res.status(500).json({ error: "Something Went Wrong!" });
};
