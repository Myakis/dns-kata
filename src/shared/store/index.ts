import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { DnsAPI } from 'shared/api/DNS/';
import { OriginalDNSApi } from 'shared/api/original-DNS';
import { NewsApi } from 'shared/api/newsApi';
import currentCityReducer from './slices/current-city-slice';
import newsSlice from './slices/news-slice';

const rootReducer = combineReducers({
  currentCity: currentCityReducer,
  news: newsSlice,
  [OriginalDNSApi.reducerPath]: OriginalDNSApi.reducer,
  [DnsAPI.reducerPath]: DnsAPI.reducer,
  [NewsApi.reducerPath]: NewsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(OriginalDNSApi.middleware, DnsAPI.middleware, NewsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
