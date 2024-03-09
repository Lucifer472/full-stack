import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TableSliceState {
  data: {
    rows: {
      id: number;
      values: Array<string | number>;
      headerId: number;
    }[];
    id: number;
    headerData: Array<string | number>;
    sheetsId: number;
  } | null;
}

const initialState: TableSliceState = {
  data: null,
};

const TableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (
      state,
      action: PayloadAction<{
        rows: {
          id: number;
          values: Array<string | number>;
          headerId: number;
        }[];
        id: number;
        headerData: Array<string | number>;
        sheetsId: number;
      }>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setTable } = TableSlice.actions;
export default TableSlice.reducer;
