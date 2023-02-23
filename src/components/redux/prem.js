import { createSlice } from "@reduxjs/toolkit";

const premSlice = createSlice({
  name: "premslice",
  initialState: {
    premium: false,
    theme:false,
  },
  reducers: {
    change: (state, action) => {
      state.premium = action.payload;
      state.theme = true;
      console.log("red", state.premium);
    },
    changetheme : (state)=> {
        state.theme = !state.theme;
    }
  },
});

export const { change,changetheme } = premSlice.actions;

export default premSlice.reducer;
