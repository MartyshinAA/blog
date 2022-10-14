import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'

export const deleteArticle = (slug, token) => (dispatch) => {
  try {
    axios({
      method: 'DELETE',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
