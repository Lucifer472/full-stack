import db from "./db";

export const createChart = async (
  id: number,
  name: string,
  chartType: string,
  values: any
) => {
  try {
    const data = await db.chart.create({
      data: {
        chartName: name,
        data: values,
        headerId: id,
        chartType,
      },
    });

    if (!data) return { error: "Something went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

export const fetchChart = async (id: number) => {
  try {
    const data = await db.chart.findMany({
      where: {
        headerId: id,
      },
    });

    if (!data) return { error: "Something went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

export const fetchCharts = async () => {
  try {
    const data = await db.chart.findMany({
      take: 100,
    });

    if (!data) return { error: "Something went Wrong!" };

    return { success: data };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

export const deleteChart = async (id: number) => {
  try {
    const data = await db.chart.delete({
      where: {
        id: id,
      },
    });

    if (!data) return { error: "Something went Wrong!" };

    return { success: "Chart Removed" };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};
