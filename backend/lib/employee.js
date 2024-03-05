// Creating New Data
import db from "./db";

export const createEmployee = async (employeeId) => {
  try {
    const data = await db.employee.create({
      data: {
        employeeId,
      },
    });

    if (!data) return { error: "Something Went Wrong!" };

    return data;
  } catch (error) {
    return { error: error };
  }
};
