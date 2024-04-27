import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICurrentCity {
  name: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

const initialState: ICurrentCity = {
  name: 'Саратов',
  coords: {
    latitude: 51.5406,
    longitude: 46.0086,
  },
};

export const currentCitySlice = createSlice({
  name: 'currentCity',
  initialState,
  reducers: {
    chooseCurrentCity(state, action: PayloadAction<ICurrentCity>) {
      state.name = action.payload.name;
      state.coords = action.payload.coords;
    },
  },
});

export default currentCitySlice.reducer;
