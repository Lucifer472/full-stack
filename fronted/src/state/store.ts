import { configureStore } from "@reduxjs/toolkit";

import SidebarSlice from "@/state/slices/SidebarSlice";
import RowSelectSlice from "@/state/slices/RowSelectSlice";
import SheetDataSlice from "@/state/slices/SheetDataSlice";
import TableSlice from "@/state/slices/TableSlice";
import ChartSlice from "@/state/slices/ChartSlice";

// Store Setup
export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
    rowSelect: RowSelectSlice,
    SheetData: SheetDataSlice,
    table: TableSlice,
    chart: ChartSlice,
  },
});

// TypeScript Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
