import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'
import { allArticlesActions } from '../redux/actions/allArticlesActions'
import { isLoadingActions } from '../redux/actions/isLoadingActions'
import { isErrorActions } from '../redux/actions/isErrorActions'
import { totalCounterOfArticlesActions } from '../redux/actions/totalCounterOfArticlesActions'

export const getAllArticles =
  (offset = 0, token) =>
  (dispatch) => {
    try {
      dispatch(isLoadingActions(true))
      dispatch(isErrorActions(false))
      axios({
        method: 'GET',
        url: `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { articles, articlesCount } = response.data
          dispatch(allArticlesActions(articles))
          dispatch(totalCounterOfArticlesActions(articlesCount))
          dispatch(isLoadingActions(false))
        })
        .catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
    } catch (error) {
      console.error(error)
    }
  }
