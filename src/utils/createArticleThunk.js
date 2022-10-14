import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'

export const createArticle = (article, token) => (dispatch) => {
  const { title, description, body, tags } = article
  const tagList = tags.map((tag) => {
    if (tag.name.length !== 0) {
      return tag.name
    } else return
  })
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
    }).catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
