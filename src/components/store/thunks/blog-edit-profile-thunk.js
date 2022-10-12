import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { signInActions } from '../actions/sign-in-actions';

export const editProfile = (person, token) => (dispatch) => {
  const { username, email, password, image } = person;
  try {
    axios({
      method: 'PUT',
      url: 'https://blog.kata.academy/api/user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        user: {
          username,
          email,
          password,
          image,
        },
      },
    })
      .then((response) => dispatch(signInActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
