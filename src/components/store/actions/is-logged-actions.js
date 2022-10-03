export const IS_LOGGED = 'IS_LOGGED';

export const isLoggedActions = (status) => ({
  type: IS_LOGGED,
  status,
});
