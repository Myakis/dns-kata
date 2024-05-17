import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBtnsType {
  chatBtnClicked: boolean;
}

const initialState: IBtnsType = {
  chatBtnClicked: false,
};

export const asideHelperBtnsSlice = createSlice({
  name: 'asideHelperBtns',
  initialState,
  reducers: {
    chatBtn(state, action: PayloadAction<boolean>) {
      state.chatBtnClicked = action.payload;
    },
  },
});

export default asideHelperBtnsSlice.reducer;
