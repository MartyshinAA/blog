import { configureStore } from '@reduxjs/toolkit';

import { isErrorReducer } from './reducers/is-error-reducer';
import { isLoadingReducer } from './reducers/is-loading-reducer';
import { allArticlesReducer } from './reducers/all-articles-reducer';
import { currentArticleReducer } from './reducers/current-article-reducer';
// pagination
import { totalCountOfArticlesReducer } from './reducers/total-counter-of-articles-reducers';
import { currentPageReducer } from './reducers/current-page-reducer';

const preloadedState = {
  isErrorReducer: false,
  isLoadingReducer: true,
  currentArticleReducer: '',
  allArticlesReducer: [],
  totalCountOfArticlesReducer: '',
  currentPageReducer: 1,
};

export const store = configureStore({
  reducer: {
    isLoadingReducer,
    isErrorReducer,
    currentArticleReducer,
    allArticlesReducer,
    totalCountOfArticlesReducer,
    currentPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: true,
  preloadedState,
});
