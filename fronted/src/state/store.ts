import { configureStore } from "@reduxjs/toolkit";

// Store Setup
export const store = configureStore({
  reducer: {},
});

// TypeScript Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
