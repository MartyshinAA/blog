import { ADD_ALL_ARTICLES } from '../actions/all-articles-actions';
import { CURRENT_ARTICLE } from '../actions/current-article-actions';

export const allArticlesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_ARTICLES:
      return action.articles;
    case CURRENT_ARTICLE:
      return state.map((article) => (article.slug === action.article.slug ? action.article : article));
    default:
      return state;
  }
};
