import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICities } from 'shared/api/original-DNS/original-dns.types';

const initialState: ICities = {
  message: '',
  loading: true,
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getCities(state, action: PayloadAction<ICities>) {
      state.data = action.payload.data;
      state.loading = false;
    },
  },
});

export default citiesSlice.reducer;
