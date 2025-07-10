import { createSlice } from "@reduxjs/toolkit";
import { useTheme } from "next-themes";

interface Theme {
  mode: number;
}

const initialState: Theme = {
  mode: 0,
};
export const reducerSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    changeDarkMode: (state) => {
      state.mode = state.mode + 1;

      if (state.mode === 3) {
        state.mode = 0;
      }
    },
  },
});

export const { changeDarkMode } = reducerSlice.actions;
export default reducerSlice.reducer;
