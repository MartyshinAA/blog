import { SIGN_UP } from '../actions/sign-up-actions';

export const createdAndloginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.person;
    default:
      return state;
  }
};
