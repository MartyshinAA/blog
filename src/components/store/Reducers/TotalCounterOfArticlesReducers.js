import { TOTAL_COUNTER_OF_ARTICLES } from '../Actions/TotalCounterOfArticlesActions'

export const totalCountOfArticlesReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_COUNTER_OF_ARTICLES:
      return action.articleCount
    default:
      return state
  }
}
