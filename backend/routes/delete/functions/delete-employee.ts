import { Request, Response } from "express";
import { deleteEmployee } from "../../../lib/sheets";

/**
 * @param req employeeId Field
 * @param res Success Message or Error Message.
 * @returns
 * This Function Deletes Employees From Database.
 */
export const deleteEmployeeById = async (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.employeeId);

  if (isNaN(employeeId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isDeleted = await deleteEmployee(employeeId);

  if (isDeleted.success) {
    return res.status(200).json({ success: isDeleted.success });
  }

  return res.status(400).json({ error: "Something Went Wrong!" });
};
