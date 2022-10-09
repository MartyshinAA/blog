import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { deleteArticleActions } from '../actions/delete-article-actions';

export const deleteArticle = (slug, token) => (dispatch) => {
  console.log(slug);
  console.log(`https://blog.kata.academy/api/articles/${slug}`);
  try {
    axios({
      method: 'DELETE',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => dispatch(deleteArticleActions(`${slug}`)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
