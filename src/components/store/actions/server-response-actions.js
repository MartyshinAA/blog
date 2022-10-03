export const SERVER_RESPONSE = 'SERVER_RESPONSE';

export const serverResponseActions = (response) => ({
  type: SERVER_RESPONSE,
  response,
});
