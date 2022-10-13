import axios from 'axios'

import { serverResponseActions } from '../Actions/ServerResponseActions'
import { signInActions } from '../Actions/SignInActions'

export const signUp = (person) => (dispatch) => {
  const { username, email, password } = person
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
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)))
  } catch (error) {
    console.error(error)
  }
}
