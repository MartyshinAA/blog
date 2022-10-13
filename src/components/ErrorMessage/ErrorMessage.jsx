import { Alert } from 'antd'

import classes from './ErrorMessage.module.scss'

const ErrorMessage = (
  <Alert
    className={classes['ErrorMessage']}
    message="Error"
    description="Something went wrong."
    type="error"
    showIcon
  />
)

export default ErrorMessage
