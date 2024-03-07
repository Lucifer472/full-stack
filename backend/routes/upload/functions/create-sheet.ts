import { Request, Response } from "express";
import * as XLSX from "xlsx";

import { sheetUpload } from "../../../lib/upload";
import { addFields, createHeader, createSheets } from "../../../lib/sheets";

/**
 * @param req Excel Sheet with Supported Format  (.xlsx) & .csv
 * @param res Uploaded Data or Error Message.
 * @returns
 * This Function Create Sheet and Add Rows Data into Database
 */
export const createSheetsAndEmployee = async (req: Request, res: Response) => {
  sheetUpload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file." });
    }

    // The file is stored in memory. Access it using req.file.buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Using the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data: object[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const header = data[0];

    // Create a new sheet with the name of the file (you might need to adjust this)
    const sheetNameFromFile = req.file.originalname.split(".")[0];
    const sheetCreationResponse = await createSheets(sheetNameFromFile);
    if (sheetCreationResponse.error) {
      return res.status(500).json({ error: sheetCreationResponse.error });
    }

    const sheetId = sheetCreationResponse.success?.id as number;

    const firstRow = await createHeader(sheetId, header);
    if (firstRow.success) {
      const rows: object[] = [];
      for (let i = 0; i < data.length; i++) {
        if (i !== 0 && Object.keys(data[i]).length !== 0) {
          let rowData = data[i];
          rows.push(rowData);
        }
      }
      const row = await addFields(rows, firstRow.success.id);

      if (row.success) {
        return res.status(200).json({ success: "Sheet Created Successfully!" });
      }
      return res.status(400).json({ error: "Something Went Wrong!" });
    }

    return res.status(400).json({ success: "Something Went Wrong!" });
  });
};
