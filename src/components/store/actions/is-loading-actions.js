export const IS_LOADING = 'IS_LOADING';

export const isLoadingActions = (status) => ({
  type: IS_LOADING,
  status,
});
