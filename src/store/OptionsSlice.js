import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const optionData = createSlice({
  name: "option",
  initialState,
  reducers: {
    toggleOptions: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleOptions } = optionData.actions;

export default optionData.reducer;
