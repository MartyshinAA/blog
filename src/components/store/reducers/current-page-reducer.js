import { CURRENT_PAGE } from '../actions/current-page-actions';

export const currentPageReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return action.currentPage;
    default:
      return state;
  }
};
