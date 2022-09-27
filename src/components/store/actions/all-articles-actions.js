// import { useSelector } from 'react-redux';

import { BlogGetInfo } from '../../../services/blog-get-info-service';

import { totalCounterOfArticlesActions } from './total-counter-of-articles-actions';
import { isLoadingActions } from './is-loading-actions';
export const ADD_ALL_ARTICLES = 'ADD_ALL_ARTICLES';

const allArticlesActions = (articles) => ({
  type: ADD_ALL_ARTICLES,
  articles,
});

export const loadArticles =
  (page = 0) =>
  (dispatch) => {
    BlogGetInfo(page).then((response) => {
      const { articles, articlesCount } = response.data;
      dispatch(isLoadingActions(false));
      dispatch(allArticlesActions(articles));
      dispatch(totalCounterOfArticlesActions(articlesCount));
    });
  };
