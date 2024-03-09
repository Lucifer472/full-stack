import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RowSelectState {
  row: number[] | null;
}

const initialState: RowSelectState = {
  row: null,
};

const RowSelectSlice = createSlice({
  name: "rowSelect",
  initialState,
  reducers: {
    setRow: (state, action: PayloadAction<number[] | null>) => {
      state.row = action.payload;
    },
  },
});

export const { setRow } = RowSelectSlice.actions;
export default RowSelectSlice.reducer;
