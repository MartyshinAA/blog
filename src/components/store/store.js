import { configureStore } from '@reduxjs/toolkit';

import { isLoadingReducer } from './reducers/is-loading-reducer';
import { allArticlesReducer } from './reducers/all-articles-reducer';
// pagination
import { totalCountOfArticlesReducer } from './reducers/total-counter-of-articles-reducers';
import { currentPageReducer } from './reducers/current-page-reducer';
// import { transfersReducer } from './reducers/transfers-reducer';

const preloadedState = {
  isLoadingReducer: true,
  allArticlesReducer: [],
  // pageOffsetReducer: 0,
  totalCountOfArticlesReducer: '',
  currentPageReducer: 1,
};

export const store = configureStore({
  reducer: { isLoadingReducer, allArticlesReducer, totalCountOfArticlesReducer, currentPageReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: true,
  preloadedState,
});
