import { configureStore } from "@reduxjs/toolkit";

import SidebarSlice from "@/state/slices/SidebarSlice";
import RowSelectSlice from "./slices/RowSelectSlice";

// Store Setup
export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
    rowSelect: RowSelectSlice,
  },
});

// TypeScript Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
