import { CURRENT_ARTICLE } from '../CONSTANTS'

export const currentArticleActions = (article) => ({
  type: CURRENT_ARTICLE,
  article,
})
