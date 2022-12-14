import axios from 'axios'

import { serverResponseActions } from '../redux/actions/serverResponseActions'
import { signInActions } from '../redux/actions/signInActions'

export const signIn = (person) => (dispatch) => {
  const { email, password } = person
  try {
    axios({
      method: 'POST',
      url: 'https://blog.kata.academy/api/users/login',
      headers: { 'Content-Type': 'application/json' },
      data: {
        user: {
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
