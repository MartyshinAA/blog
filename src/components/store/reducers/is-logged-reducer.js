import { IS_LOGGED } from '../actions/is-logged-actions';

export const isLoggedReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return action.status;
    default:
      return state;
  }
};
