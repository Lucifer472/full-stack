import { Request, Response } from "express";
import { updateCustomField } from "../../../lib/sheets";

/**
 * @param req fieldId and ChangedValue for Updating Data
 * @param res Success Message or Error Message.
 * @returns
 * This Function Updated Custom Field Data.
 */
export const updateFieldByEmployeeId = async (req: Request, res: Response) => {
  const fieldId = parseInt(req.params.fieldId);

  const { changedValue } = req.body;

  if (isNaN(fieldId)) {
    return res.status(400).json({ error: "Invalid Sheet ID" });
  }

  const isUpdated = await updateCustomField(fieldId, changedValue);

  if (isUpdated.success) {
    return res.status(200).json({ success: isUpdated.success });
  }

  return res.status(400).send({ error: isUpdated.error });
};
