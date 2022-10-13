import axios from 'axios'

import { serverResponseActions } from '../Actions/ServerResponseActions'
import { currentArticleActions } from '../Actions/CurrentArticleActions'

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
        dispatch(currentArticleActions(response.data.article))
      })

      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
