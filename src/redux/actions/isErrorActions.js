import { IS_ERROR } from '../CONSTANTS'

export const isErrorActions = (status) => ({
  type: IS_ERROR,
  status,
})
