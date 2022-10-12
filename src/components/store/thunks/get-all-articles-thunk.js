import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { allArticlesActions } from '../actions/all-articles-actions';
import { isLoadingActions } from '../actions/is-loading-actions';
import { isErrorActions } from '../actions/is-error-actions';
import { totalCounterOfArticlesActions } from '../actions/total-counter-of-articles-actions';

export const getAllArticles =
  (offset = 0, token) =>
  (dispatch) => {
    try {
      dispatch(isLoadingActions(true));
      dispatch(isErrorActions(false));
      axios({
        method: 'GET',
        url: `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { articles, articlesCount } = response.data;
          dispatch(allArticlesActions(articles));
          dispatch(totalCounterOfArticlesActions(articlesCount));
          dispatch(isLoadingActions(false));
        })
        .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
    } catch (error) {
      console.error(error);
    }
  };
