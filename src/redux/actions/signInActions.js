import { SIGN_IN } from '../CONSTANTS'

export const signInActions = (person) => ({
  type: SIGN_IN,
  person,
})
