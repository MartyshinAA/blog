// import { BlogGetArticles } from '../../../services/blog-get-all-articles-service';

// import { totalCounterOfArticlesActions } from './total-counter-of-articles-actions';
export const ADD_ALL_ARTICLES = 'ADD_ALL_ARTICLES';

export const allArticlesActions = (articles) => ({
  type: ADD_ALL_ARTICLES,
  articles,
});
