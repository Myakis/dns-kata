import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { News, NewsState } from './types';

export const sortingNews = createAsyncThunk<News[], unknown>('sortingNews', async function sorting(_, { getState }) {
  const { news: NewsState } = getState() as { news: NewsState };

  let array = NewsState.newsData.filter((item) => {
    if (NewsState.type === 'all' || item.type === NewsState.type) {
      return item;
    }
  });

  array = array.slice(0, NewsState.display);

  console.log(array);
  return [];
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
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    showMore: (state) => {
      state.display += 6;
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    getNews: (state, action: PayloadAction<News[]>) => {
      state.newsData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sortingNews.fulfilled, () => {
      console.log(1);
    });
  },
});

export default NewsSlice.reducer;
