import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
// import { createArticleActions } from '../actions/create-article-actions';

export const createArticle = (article, token) => (dispatch) => {
  const { title, description, body, tags } = article;
  const tagList = tags.map((tag) => {
    console.log(tag.name.length !== 0);
    if (tag.name.length !== 0) {
      return tag.name;
    } else return;
  });
  console.log(title, description, body, tagList, token);
  try {
    axios({
      method: 'POST',
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
      // .then((response) => dispatch(createArticleActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
