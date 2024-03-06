import { Request, Response } from "express";

import {
  fetchAllEmployees,
  fetchFieldsFromEmployee,
} from "../../../lib/sheets";

/**
 * @param req sheetId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function fetches Employees From Database.
 */
export const fetchEmployeesFromDb = async (req: Request, res: Response) => {
  const sheetId = parseInt(req.params.sheetId);

  if (isNaN(sheetId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const employees = await fetchAllEmployees(sheetId);

  if (employees.success) {
    const rows: any = [];
    const fields: any = {};
    for (const employee of employees.success) {
      const data = await fetchFieldsFromEmployee(employee.id);

      if (data.success) {
        data.success.forEach((d) => {
          fields["id"] = d.id;
          fields[d.key] = d.value;
        });
        rows.push(fields);
      } else {
        console.log(data.error);
      }
    }

    return res.status(200).json({ success: rows });
  } else {
    return res.status(500).json({ error: "No Data Found!" });
  }
};
