import { LIKE_ARTICLE } from '../actions/like-article-actions';

export const likeArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ARTICLE:
      return action.status;
    default:
      return state;
  }
};
