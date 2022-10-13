export const TOTAL_COUNTER_OF_ARTICLES = 'TOTAL_COUNTER_OF_ARTICLES'

export const totalCounterOfArticlesActions = (articleCount) => ({
  type: TOTAL_COUNTER_OF_ARTICLES,
  articleCount,
})
