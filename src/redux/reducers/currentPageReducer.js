import { CURRENT_PAGE } from '../CONSTANTS'

export const currentPageReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return action.currentPage
    default:
      return state
  }
}
