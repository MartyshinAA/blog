import { ADD_ALL_ARTICLES } from '../CONSTANTS'

export const allArticlesActions = (articles) => ({
  type: ADD_ALL_ARTICLES,
  articles,
})
