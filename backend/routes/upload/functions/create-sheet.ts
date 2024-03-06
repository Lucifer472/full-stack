import { Request, Response } from "express";
import * as XLSX from "xlsx";

import { sheetUpload } from "../../../lib/upload";
import { addFields, createEmployee, createSheets } from "../../../lib/sheets";

/**
 * @param req Excel Sheet with Supported Format  (.xlsx) & .csv
 * @param res Uploaded Data or Error Message.
 * @returns
 * This Function Create Sheet and Add Employee Data into Database
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
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const keys = data[0];

    // Create a new sheet with the name of the file (you might need to adjust this)
    const sheetNameFromFile = req.file.originalname.split(".")[0];
    const sheetCreationResponse = await createSheets(sheetNameFromFile);
    if (sheetCreationResponse.error) {
      return res.status(500).json({ error: sheetCreationResponse.error });
    }

    const sheetId = sheetCreationResponse.success?.id as number;

    for (let index = 1; index < data.length; index++) {
      const d: any = data[index];

      if (index !== 0) {
        if (!d.every((value: any) => value === null || value === undefined)) {
          const employee = await createEmployee(sheetId);

          if (employee.error) {
            return res.status(500).json({ error: "Something Went Wrong!" });
          }

          if (employee.success) {
            const field = await addFields(
              keys as string[],
              d,
              employee.success.id
            );

            if (field.error) {
              return res.status(500).json({ error: "Something Went Wrong!" });
            }
          }
        } else {
          // Handle the case where the array is empty (all values are null or undefined)
          console.log("Row is empty. Skipping employee creation.");
        }
      }
    }

    return res
      .status(200)
      .json({ success: "Sheet and employee data created successfully." });
  });
};
