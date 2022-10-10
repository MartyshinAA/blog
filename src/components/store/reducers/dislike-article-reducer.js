import { DISLIKE_ARTICLE } from '../actions/dislike-article-actions';

export const dislikeArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case DISLIKE_ARTICLE:
      return action.status;
    default:
      return state;
  }
};
