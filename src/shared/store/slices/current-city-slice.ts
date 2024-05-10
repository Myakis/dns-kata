import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICurrentCity {
  name: string;
  slug: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

const initialState: ICurrentCity = {
  name: 'Саратов',
  slug: 'saratov',
  coords: {
    latitude: 51.5406,
    longitude: 46.0086,
  },
};

export const currentCitySlice = createSlice({
  name: 'currentCity',
  initialState,
  reducers: {
    setInitialCity(state) {
      state.coords = initialState.coords;
      state.name = initialState.name;
      state.slug = initialState.slug;
    },
    chooseCurrentCity(state, action: PayloadAction<ICurrentCity>) {
      state.name = action.payload.name;
      state.coords = action.payload.coords;
      state.slug = action.payload.slug;
    },
  },
});

export default currentCitySlice.reducer;
