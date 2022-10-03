import { configureStore } from '@reduxjs/toolkit';

import { isErrorReducer } from './reducers/is-error-reducer';
import { isLoadingReducer } from './reducers/is-loading-reducer';
import { allArticlesReducer } from './reducers/all-articles-reducer';
import { currentArticleReducer } from './reducers/current-article-reducer';
// pagination
import { totalCountOfArticlesReducer } from './reducers/total-counter-of-articles-reducers';
import { currentPageReducer } from './reducers/current-page-reducer';
// import { createdAndloginUserReducer } from './reducers/sign-up-reducer';
import { loginUserReducer } from './reducers/sign-in-reducer';
import { serverResponseReducer } from './reducers/server-response-reducer';
import { isLoggedReducer } from './reducers/is-logged-reducer';

const preloadedState = {
  isErrorReducer: false,
  isLoadingReducer: true,
  currentArticleReducer: '',
  allArticlesReducer: [],
  totalCountOfArticlesReducer: '',
  currentPageReducer: 1,
  // createdAndloginUserReducer: {},
  loginUserReducer: {},
  serverResponseReducer: {},
  isLoggedReducer: Boolean,
};

export const store = configureStore({
  reducer: {
    isLoadingReducer,
    isErrorReducer,
    currentArticleReducer,
    allArticlesReducer,
    totalCountOfArticlesReducer,
    currentPageReducer,
    // createdAndloginUserReducer,
    loginUserReducer,
    serverResponseReducer,
    isLoggedReducer,
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
