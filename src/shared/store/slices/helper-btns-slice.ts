import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBtnsType {
  chatBtnClicked: boolean;
}

const initialState: IBtnsType = {
  chatBtnClicked: false,
};

export const helperBtnsSlice = createSlice({
  name: 'helperBtns',
  initialState,
  reducers: {
    chatBtn(state, action: PayloadAction<boolean>) {
      state.chatBtnClicked = action.payload;
    },
  },
});

export default helperBtnsSlice.reducer;
