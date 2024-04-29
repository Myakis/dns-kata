import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { DnsAPI } from 'shared/api/DNS/';
import { OriginalDNSApi } from 'shared/api/original-DNS';
import currentCityReducer from './reducers/current-city-slice';

const rootReducer = combineReducers({
  currentCity: currentCityReducer,
  [OriginalDNSApi.reducerPath]: OriginalDNSApi.reducer,
  [DnsAPI.reducerPath]: DnsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(OriginalDNSApi.middleware, DnsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
