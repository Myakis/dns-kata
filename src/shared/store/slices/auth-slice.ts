import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuth {
  email: string;
  password?: string;
}

const initialState: IAuth = {
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth(state, action: PayloadAction<IAuth>) {
      state.email = action.payload.email;
    },
    logOut(state) {
      state.email = initialState.email;
    },
  },
});

export default authSlice.reducer;
