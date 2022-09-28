import { IS_ERROR } from '../actions/is-error-actions';

export const isErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_ERROR:
      return action.status;
    default:
      return state;
  }
};
