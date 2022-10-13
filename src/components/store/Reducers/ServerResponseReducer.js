import { SERVER_RESPONSE } from '../Actions/ServerResponseActions'

export const serverResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVER_RESPONSE:
      return action.response === undefined ? state : action.response
    default:
      return state
  }
}
