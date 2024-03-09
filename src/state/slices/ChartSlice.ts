import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ChartSliceState {
  data:
    | {
        id: number;
        chartName: string;
        chartType: string;
        data: { [key: string]: number };
        headerId: number;
      }[]
    | null;
}

const initialState: ChartSliceState = {
  data: null,
};

const ChartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChart: (
      state,
      action: PayloadAction<
        | {
            id: number;
            chartName: string;
            chartType: string;
            data: { [key: string]: number };
            headerId: number;
          }[]
        | null
      >
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setChart } = ChartSlice.actions;
export default ChartSlice.reducer;
