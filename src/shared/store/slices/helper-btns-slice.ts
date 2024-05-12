import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBtnsType {
  chatBtnClicked: boolean;
  scrollBtnClicked: boolean;
}

const initialState: IBtnsType = {
  chatBtnClicked: false,
  scrollBtnClicked: false,
};

export const helperBtnsSlice = createSlice({
  name: 'helperBtns',
  initialState,
  reducers: {
    chatBtn(state, action: PayloadAction<boolean>) {
      state.chatBtnClicked = action.payload;
    },
    scrollBtn(state, action: PayloadAction<boolean>) {
      state.scrollBtnClicked = action.payload;
    },
  },
});

export default helperBtnsSlice.reducer;
