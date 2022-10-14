import { SERVER_RESPONSE } from '../CONSTANTS'

export const serverResponseActions = (response) => ({
  type: SERVER_RESPONSE,
  response,
})
