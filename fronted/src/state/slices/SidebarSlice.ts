import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setOpen } = SidebarSlice.actions;
export default SidebarSlice.reducer;
