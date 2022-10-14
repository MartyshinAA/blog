import { SIGN_IN } from '../CONSTANTS'

export const loggedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.person
    default:
      return state
  }
}
