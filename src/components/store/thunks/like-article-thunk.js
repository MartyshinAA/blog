import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { likeArticleActions } from '../actions/like-article-actions';

export const likeArticle = (slug, token) => (dispatch) => {
  console.log(slug);
  console.log(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  try {
    axios({
      method: 'POST',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => dispatch(likeArticleActions(`${slug}`)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
