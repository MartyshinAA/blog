export const IS_ERROR = 'IS_ERROR';

export const isErrorActions = (status) => ({
  type: IS_ERROR,
  status,
});
