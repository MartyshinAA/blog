import { IS_LOADING } from '../CONSTANTS'

export const isLoadingReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status
    default:
      return state
  }
}
