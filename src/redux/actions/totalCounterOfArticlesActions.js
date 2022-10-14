import { TOTAL_COUNTER_OF_ARTICLES } from '../CONSTANTS'

export const totalCounterOfArticlesActions = (articleCount) => ({
  type: TOTAL_COUNTER_OF_ARTICLES,
  articleCount,
})
