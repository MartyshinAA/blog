import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { signInActions } from '../actions/sign-in-actions';
// import { signUpActions } from '../actions/sign-up-actions';

export const signUp = (person) => (dispatch) => {
  const { username, email, password } = person;
  try {
    axios({
      method: 'POST',
      url: 'https://blog.kata.academy/api/users',
      headers: { 'Content-Type': 'application/json' },
      data: {
        user: {
          username,
          email,
          password,
        },
      },
    })
      .then((response) => dispatch(signInActions(response.data.user)))
      // .then((response) => dispatch(signUpActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
