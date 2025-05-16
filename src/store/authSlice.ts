// store/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isRegisterView: boolean;
}

const initialState: AuthState = {
  isRegisterView: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthView: (state) => {
      state.isRegisterView = !state.isRegisterView;
    },
    setAuthView: (state, action: PayloadAction<boolean>) => {
      state.isRegisterView = action.payload;
    },
  },
});

export const { toggleAuthView, setAuthView } = authSlice.actions;
export default authSlice.reducer;
