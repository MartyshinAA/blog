import { IS_LOADING } from '../CONSTANTS'

export const isLoadingActions = (status) => ({
  type: IS_LOADING,
  status,
})
