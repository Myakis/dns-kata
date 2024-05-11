import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { News, NewsState } from './types';

export const sortingNews = createAsyncThunk<News[], unknown>('sortingNews', async function sorting(_, { getState }) {
  const { news: NewsState } = getState() as { news: NewsState };
  let array = NewsState.newsData.filter((item) => {
    if (NewsState.type === 'all' || item.type === NewsState.type) {
      return item;
    }
  });

  array = array.slice((NewsState.page - 1) * 6, NewsState.display);
  return array;
});

const initialState: NewsState = {
  page: 1,
  display: 6,
  type: 'all',
  sortedNews: [],
  newsData: [],
};

export const NewsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    showMore: (state) => {
      state.display += 6;
      state.page += 1;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.display = 6;
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.display = 6;
    },
    getNews: (state, action: PayloadAction<News[]>) => {
      state.newsData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sortingNews.fulfilled, (state, action: PayloadAction<News[]>) => {
      state.sortedNews = action.payload;
    });
  },
});

export default NewsSlice.reducer;
