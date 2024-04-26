import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { DnsAPI } from 'shared/api/DNS';
import currentCityReducer from './reducers/currentCitySlice';

const rootReducer = combineReducers({
  currentCityReducer,
  [DnsAPI.reducerPath]: DnsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(DnsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
