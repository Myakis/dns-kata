import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { DNSOriginalAPI } from 'shared/api/DNS-original-API';
import { DnsAPI } from 'shared/api/DNS/DNS-API';
import currentCityReducer from './reducers/CurrentCity';

const rootReducer = combineReducers({
  currentCityReducer,
  [DNSOriginalAPI.reducerPath]: DNSOriginalAPI.reducer,
  [DnsAPI.reducerPath]: DnsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(DNSOriginalAPI.middleware, DnsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
