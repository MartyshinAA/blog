import { ADD_ALL_ARTICLES } from '../Actions/AllArticlesActions'
import { CURRENT_ARTICLE } from '../Actions/CurrentArticleActions'

export const allArticlesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_ARTICLES:
      return action.articles
    case CURRENT_ARTICLE:
      return state.map((article) => (article.slug === action.article.slug ? action.article : article))
    default:
      return state
  }
}
