import { configureStore } from "@reduxjs/toolkit";

import SidebarSlice from "@/state/slices/SidebarSlice";

// Store Setup
export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
  },
});

// TypeScript Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
