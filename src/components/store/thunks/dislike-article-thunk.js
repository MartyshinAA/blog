import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { currentArticleActions } from '../actions/current-article-actions';

export const dislikeArticle = (slug, token) => (dispatch) => {
  try {
    axios({
      method: 'DELETE',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // renew state of current article after dislike
        dispatch(currentArticleActions(response.data.article));
      })

      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
