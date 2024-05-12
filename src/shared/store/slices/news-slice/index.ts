import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { News, NewsState } from './types';

export const sortingNews = createAsyncThunk<News[], unknown>('sortingNews', function sorting(_, { getState }) {
  const { news: NewsState } = getState() as { news: NewsState };
  let array = NewsState.newsData.filter((item) => {
    if (NewsState.type === 'all' || item.type === NewsState.type) {
      return item;
    }
  });

  array = array.slice((NewsState.page - 1) * 9, (NewsState.page - 1) * 9 + NewsState.display);
  return array;
});

const initialState: NewsState = {
  loadNews: false,
  page: 1,
  display: 9,
  type: 'all',
  articleNews: {
    id: 0,
    name: '',
    description: 'none',
    type: '',
    date: '',
    viewsCount: 0,
    commentsCount: 0,
  },
  sortedNews: [],
  newsData: [],
};

export const NewsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    showMore: (state) => {
      state.display += 9;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.display = 9;
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.display = 9;
    },
    getNews: (state, action: PayloadAction<News[]>) => {
      state.newsData = action.payload;
      if (action.payload) {
        state.loadNews = true;
      }
    },
    findNewsId: (state, action: PayloadAction<News>) => {
      state.articleNews = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sortingNews.fulfilled, (state, action: PayloadAction<News[]>) => {
      state.sortedNews = action.payload;
    });
  },
});

export default NewsSlice.reducer;
