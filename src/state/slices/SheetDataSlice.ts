import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SheetDataSliceState {
  data: { id: number; sheetName: string }[] | null;
}

const initialState: SheetDataSliceState = {
  data: null,
};

const SheetDataSlice = createSlice({
  name: "sheetDataSlice",
  initialState,
  reducers: {
    setSheetData: (
      state,
      action: PayloadAction<{ id: number; sheetName: string }[] | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setSheetData } = SheetDataSlice.actions;
export default SheetDataSlice.reducer;
