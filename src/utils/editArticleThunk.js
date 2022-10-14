import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'

export const editArticle = (slug, article, token) => (dispatch) => {
  const { title, description, body, tags } = article
  const tagList = tags.map((tag) => {
    if (tag.name.length !== 0) {
      return tag.name
    } else return
  })
  console.log(slug, token)
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
    }).catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
