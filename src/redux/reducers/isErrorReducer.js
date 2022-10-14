import { IS_ERROR } from '../CONSTANTS'

export const isErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_ERROR:
      return action.status
    default:
      return state
  }
}
