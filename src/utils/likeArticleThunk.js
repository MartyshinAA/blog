import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'
import { currentArticleActions } from '../redux/actions/currentArticleActions'

export const likeArticle = (slug, token) => (dispatch) => {
  try {
    axios({
      method: 'POST',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // renew state of current article after like
        dispatch(currentArticleActions(response.data.article))
      })
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
