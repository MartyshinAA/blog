import { CURRENT_PAGE } from '../CONSTANTS'

export const currentPageActions = (currentPage) => ({
  type: CURRENT_PAGE,
  currentPage,
})
