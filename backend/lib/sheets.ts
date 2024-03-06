// Creating New Data
import db from "./db";

// Create Functions For Sheet & Employee
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

// Fetch Functions For Sheets & Employee
export const fetchSheets = async () => {
  try {
    const data = await db.sheets.findMany({
      take: 100,
    });

    if (!data) return { error: null };
    return { success: data };
  } catch (error) {
    return { error: null };
  }
};

export const fetchAllEmployees = async (sheetsId: number) => {
  try {
    const data = await db.employee.findMany({
      where: {
        sheetsId,
      },
    });

    if (!data) return { error: null };
    return { success: data };
  } catch (error) {
    return { error: null };
  }
};

export const fetchFieldsFromEmployee = async (employeeId: number) => {
  try {
    const data = await db.employeeCustomField.findMany({
      where: {
        employeeId,
      },
      select: {
        id: true,
        key: true,
        value: true,
      },
    });

    if (!data) return { error: null };
    return { success: data };
  } catch (error) {
    return { error: null };
  }
};

// Delete Functions for Sheets & Employee
export const deleteSheet = async (id: number) => {
  try {
    await db.sheets.delete({
      where: {
        id,
      },
    });
    return { success: "Sheet Removed Successfully!" };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await db.employee.delete({
      where: {
        id,
      },
    });
    return { success: "Employee Removed Successfully!" };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

// Update Functions for Sheet & Employee
export const updateNameSheet = async (id: number, name: string) => {
  try {
    await db.sheets.update({
      where: {
        id,
      },
      data: {
        sheetName: name,
      },
    });

    return { success: "File Name Changed Successfully!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

export const updateCustomField = async (id: number, value: string) => {
  try {
    await db.employeeCustomField.update({
      where: {
        id,
      },
      data: {
        value,
      },
    });

    return { success: "Changes Saved Successfully!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
