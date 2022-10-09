import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { createArticleActions } from '../actions/create-article-actions';
// import { signUpActions } from '../actions/sign-up-actions';

export const createArticle = (article, token) => (dispatch) => {
  const { title, description, body, tagList } = article;
  // console.log(title, description, body, tagList);
  try {
    axios({
      method: 'PUT',
      url: 'https://blog.kata.academy/api/articles',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
    })
      .then((response) => dispatch(createArticleActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
