import { configureStore } from '@reduxjs/toolkit'

import { isErrorReducer } from './Reducers/IsErrorReducer'
import { isLoadingReducer } from './Reducers/IsLoadingReducer'
import { allArticlesReducer } from './Reducers/AllArticlesReducer'
import { currentArticleReducer } from './Reducers/CurrentArticleReducer'
// pagination
import { totalCountOfArticlesReducer } from './Reducers/TotalCounterOfArticlesReducers'
import { currentPageReducer } from './Reducers/CurrentPageReducer'
import { loggedUserReducer } from './Reducers/SignInReducer'
import { serverResponseReducer } from './Reducers/ServerResponseReducer'

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
