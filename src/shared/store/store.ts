import { combineReducers, configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/CitiesSlice';
import currentCityReducer from './reducers/CurrentCity';

const rootReducer = combineReducers({
  citiesReducer,
  currentCityReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
