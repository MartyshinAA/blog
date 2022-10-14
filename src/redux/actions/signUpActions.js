import { SIGN_UP } from '../CONSTANTS'

export const signUpActions = (person) => ({
  type: SIGN_UP,
  person,
})
