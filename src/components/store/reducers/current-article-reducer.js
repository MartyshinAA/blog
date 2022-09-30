import { CURRENT_ARTICLE } from '../actions/current-article-actions';

export const currentArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_ARTICLE:
      return action.article;
    default:
      return state;
  }
};
