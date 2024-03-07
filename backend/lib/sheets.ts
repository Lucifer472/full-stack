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

// Header Functions
export const createHeader = async (sheetsId: number, headerData: object) => {
  try {
    const data = await db.header.create({
      data: {
        headerData,
        sheetsId,
      },
    });
    if (!data) return { error: "Something Went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: error };
  }
};

export const addFields = async (values: object[], headerId: number) => {
  try {
    const fieldsData = values.map((v) => ({
      values: v,
      headerId,
    }));

    const data = await db.rows.createMany({
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

export const fetchAllData = async (sheetsId: number) => {
  try {
    const data = await db.header.findMany({
      where: {
        sheetsId,
      },
      include: {
        rows: true,
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

export const deleteRows = async (id: number) => {
  try {
    await db.rows.delete({
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

export const updateRows = async (id: number, values: string) => {
  try {
    await db.rows.update({
      where: {
        id,
      },
      data: {
        values,
      },
    });

    return { success: "Changes Saved Successfully!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
