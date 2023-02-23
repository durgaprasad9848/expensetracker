import { createSlice } from "@reduxjs/toolkit";

const expSlice = createSlice({
  name: "expensedata",
  initialState: {
    data: null,
    premium: false,
  },
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
      console.log("red", state.data);
    },
  },
});

export const { update } = expSlice.actions;

export default expSlice.reducer;
