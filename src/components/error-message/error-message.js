import { Alert } from 'antd';

import classes from './error-message.module.scss';

const errorMessage = (
  <Alert
    className={classes['error-message']}
    message="Error"
    description="Something went wrong."
    type="error"
    showIcon
  />
);

export default errorMessage;
