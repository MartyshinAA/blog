import { SERVER_RESPONSE } from '../actions/server-response-actions';

export const serverResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVER_RESPONSE:
      return action.response;
    default:
      return state;
  }
};
