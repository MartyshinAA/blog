import { SIGN_UP } from '../CONSTANTS'

export const createdAndloginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.person
    default:
      return state
  }
}
