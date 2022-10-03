import axios from 'axios';

import { serverResponseActions } from '../actions/server-response-actions';
import { isLoggedActions } from '../actions/is-logged-actions';

export const isLogged = () => (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: 'https://blog.kata.academy/api/user',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzk4MjI2M2NmNzA1MWIwMDgyYTllOSIsInVzZXJuYW1lIjoicGVuc2lsdmFuaWEiLCJleHAiOjE2Njk4OTcyNTQsImlhdCI6MTY2NDcxMzI1NH0.mi07VDEFAUh_-dOp6tEj5jCbnBE8FNZXLxR8sjupztc',
      },
    })
      .then((response) => dispatch(isLoggedActions(response.data.user)))
      .catch((error) => dispatch(serverResponseActions(error.response.data.errors)));
  } catch (error) {
    console.error(error);
  }
};
