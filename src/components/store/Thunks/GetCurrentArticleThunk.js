import axios from 'axios'

import { serverResponseActions } from '../Actions/ServerResponseActions'
import { currentArticleActions } from '../Actions/CurrentArticleActions'
import { isLoadingActions } from '../Actions/IsLoadingActions'
import { isErrorActions } from '../Actions/IsErrorActions'

export const getCurrentArticle = (slug, token) => (dispatch) => {
  try {
    dispatch(isErrorActions(false))
    dispatch(currentArticleActions(''))
    axios({
      method: 'GET',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(isLoadingActions(true))
        const { article } = response.data
        dispatch(currentArticleActions(article))
        dispatch(isLoadingActions(false))
      })
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
