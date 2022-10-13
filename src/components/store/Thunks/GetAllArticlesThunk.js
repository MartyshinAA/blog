import axios from 'axios'

import { allArticlesActions } from '../Actions/AllArticlesActions'
import { isLoadingActions } from '../Actions/IsLoadingActions'
import { isErrorActions } from '../Actions/IsErrorActions'
import { totalCounterOfArticlesActions } from '../Actions/TotalCounterOfArticlesActions'

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
        .catch(() => dispatch(isErrorActions(true)))
    } catch (error) {
      console.error(error)
    }
  }
