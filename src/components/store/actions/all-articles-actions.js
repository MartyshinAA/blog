// import { BlogGetArticles } from '../../../services/blog-get-all-articles-service';

// import { totalCounterOfArticlesActions } from './total-counter-of-articles-actions';
// import { isLoadingActions } from './is-loading-actions';
// import { isErrorActions } from './is-error-actions';
export const ADD_ALL_ARTICLES = 'ADD_ALL_ARTICLES';

export const allArticlesActions = (articles) => ({
  type: ADD_ALL_ARTICLES,
  articles,
});

// export const loadArticles = (page) => (dispatch) => {
//   dispatch(isLoadingActions(true));
//   dispatch(isErrorActions(false));
//   BlogGetArticles(page)
//     .then((response) => {
//       const { articles, articlesCount } = response.data;
//       dispatch(allArticlesActions(articles));
//       dispatch(totalCounterOfArticlesActions(articlesCount));
//       dispatch(isLoadingActions(false));
//     })
//     .catch(() => dispatch(isErrorActions(true)));
// };
