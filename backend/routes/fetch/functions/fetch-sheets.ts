import { Request, Response } from "express";
import { fetchSheets } from "../../../lib/sheets";

/**
 *
 * @param req Nothing Required
 * @param res Sheets Data upto 100 or Error Message.
 * @returns
 * This Function fetches all The Sheets from the database.
 */
export const fetchSheetsFromDb = async (req: Request, res: Response) => {
  const data = await fetchSheets();

  if (data.success) {
    return res.status(200).json({
      success: data.success,
    });
  }

  return res.status(500).json({ error: "Something Went Wrong!" });
};
