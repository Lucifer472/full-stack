// Creating New Data
import db from "./db";

// Sheets Functions
export const createSheets = async (name: string) => {
  try {
    const data = await db.sheets.create({
      data: {
        sheetName: name,
      },
    });

    if (!data) return { error: "Something Went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

// Employee Functions
export const createEmployee = async (sheetsId: number) => {
  try {
    const data = await db.employee.create({
      data: {
        sheetsId,
      },
    });
    if (!data) return { error: "Something Went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: error };
  }
};

export const addFields = async (
  keys: string[],
  values: string[],
  employeeId: number
) => {
  try {
    const fieldsData = keys.map((key, index) => ({
      key: key.toString(),
      value: values[index].toString(),
      employeeId,
    }));

    console.log(fieldsData);

    const data = await db.employeeCustomField.createMany({
      data: fieldsData,
    });

    if (!data) return { error: "Something Went Wrong!" };

    return { success: data };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
