import { createSlice } from "@reduxjs/toolkit";

export const reducerSlice = createSlice({
  name: "counter",
  initialState: {
    darkMode: false,
  },
  reducers: {
    changeDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeDarkMode } = reducerSlice.actions;
export default reducerSlice.reducer;
