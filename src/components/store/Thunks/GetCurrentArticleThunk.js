import axios from 'axios'

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
      .catch(() => dispatch(isErrorActions(true)))
  } catch (error) {
    console.error(error)
  }
}
