import { CURRENT_ARTICLE } from '../Actions/CurrentArticleActions'

export const currentArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_ARTICLE:
      return action.article
    default:
      return state
  }
}
