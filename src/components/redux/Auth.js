import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    token: null,
    email: localStorage.getItem("email"),
  },
 
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("token",state.token);
     
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
