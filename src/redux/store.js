import { configureStore } from '@reduxjs/toolkit'

import { isErrorReducer } from '../redux/reducers/isErrorReducer'
import { isLoadingReducer } from '../redux/reducers/isLoadingReducer'
import { allArticlesReducer } from '../redux/reducers/allArticlesReducer'
import { currentArticleReducer } from '../redux/reducers/currentArticleReducer'
// pagination
import { totalCountOfArticlesReducer } from '../redux/reducers/totalCounterOfArticlesReducers'
import { currentPageReducer } from '../redux/reducers/currentPageReducer'
import { loggedUserReducer } from '../redux/reducers/signInReducer'
import { serverResponseReducer } from '../redux/reducers/serverResponseReducer'

const preloadedState = {
  isErrorReducer: false,
  isLoadingReducer: true,
  currentArticleReducer: '',
  allArticlesReducer: [],
  totalCountOfArticlesReducer: '',
  currentPageReducer: 1,
  loggedUserReducer: {},
  serverResponseReducer: {},
}

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: true,
  preloadedState,
})
