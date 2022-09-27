import { IS_LOADING } from '../actions/is-loading-actions';

export const isLoadingReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status;
    default:
      return state;
  }
};
