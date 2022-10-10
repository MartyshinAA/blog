import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { currentArticleActions } from '../actions/current-article-actions';

export const dislikeArticle = (slug, token) => (dispatch) => {
  console.log(slug);
  console.log(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  try {
    axios({
      method: 'DELETE',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => dispatch(currentArticleActions(response.data.article)))

      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
