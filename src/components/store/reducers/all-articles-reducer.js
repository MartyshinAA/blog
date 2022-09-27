import { ADD_ALL_ARTICLES } from '../actions/all-articles-actions';

export const allArticlesReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_ALL_ARTICLES:
      return action.articles;
    default:
      return state;
  }
};
