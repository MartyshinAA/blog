import { configureStore } from '@reduxjs/toolkit';

import { isErrorReducer } from './reducers/is-error-reducer';
import { isLoadingReducer } from './reducers/is-loading-reducer';
import { allArticlesReducer } from './reducers/all-articles-reducer';
import { currentArticleReducer } from './reducers/current-article-reducer';
// pagination
import { totalCountOfArticlesReducer } from './reducers/total-counter-of-articles-reducers';
import { currentPageReducer } from './reducers/current-page-reducer';
import { loggedUserReducer } from './reducers/sign-in-reducer';
import { serverResponseReducer } from './reducers/server-response-reducer';
// import { isLoggedReducer } from './reducers/is-logged-reducer';
// import { deleteArticleReducer } from './reducers/delete-article-reducer';
// import { editArticleReducer } from './reducers/edit-article-reducer';
// import { likeArticleReducer } from './reducers/like-article-reducer';
// import { dislikeArticleReducer } from './reducers/dislike-article-reducer';

const preloadedState = {
  isErrorReducer: false,
  isLoadingReducer: true,
  currentArticleReducer: '',
  allArticlesReducer: [],
  totalCountOfArticlesReducer: '',
  currentPageReducer: 1,
  loggedUserReducer: {},
  serverResponseReducer: {},
  // isLoggedReducer: Boolean,
  // deleteArticleReducer: '',
  // editArticleReducer: '',
  // likeArticleReducer: Boolean,
  // dislikeArticleReducer: Boolean,
};

export const store = configureStore({
  reducer: {
    isLoadingReducer,
    isErrorReducer,
    currentArticleReducer,
    allArticlesReducer,
    totalCountOfArticlesReducer,
    currentPageReducer,
    loggedUserReducer,
    serverResponseReducer,
    // isLoggedReducer,
    // deleteArticleReducer,
    // editArticleReducer,
    // likeArticleReducer,
    // dislikeArticleReducer,
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
