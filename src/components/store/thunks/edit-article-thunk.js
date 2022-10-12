import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
// import { editArticleActions } from '../actions/edit-article-actions';
// import { signUpActions } from '../actions/sign-up-actions';

export const editArticle = (slug, article, token) => (dispatch) => {
  const { title, description, body, tags } = article;
  const tagList = tags.map((tag) => {
    console.log(tag.name.length !== 0);
    if (tag.name.length !== 0) {
      return tag.name;
    } else return;
  });
  // const { title, description, body } = article;
  console.log(slug, token);
  try {
    axios({
      method: 'PUT',
      url: `https://blog.kata.academy/api/articles/${slug}`,
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
      // .then((response) => dispatch(editArticleActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
