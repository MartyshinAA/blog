import { BlogGetInfo } from '../../../services/blog-get-info-service';

import { totalCounterOfArticlesActions } from './total-counter-of-articles-actions';
import { isLoadingActions } from './is-loading-actions';
import { isErrorActions } from './is-error-actions';
export const ADD_ALL_ARTICLES = 'ADD_ALL_ARTICLES';

const allArticlesActions = (articles) => ({
  type: ADD_ALL_ARTICLES,
  articles,
});

export const loadArticles =
  (page = 0) =>
  (dispatch) => {
    dispatch(isLoadingActions(true));
    dispatch(isErrorActions(false));
    BlogGetInfo(page)
      .then((response) => {
        dispatch(isLoadingActions(false));
        const { articles, articlesCount } = response.data;
        dispatch(allArticlesActions(articles));
        dispatch(totalCounterOfArticlesActions(articlesCount));
      })
      .catch(() => dispatch(isErrorActions(true)));
  };
