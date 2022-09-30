import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';

import classes from './sign-in-mw.module.scss';

const SignIn = () => {
  return (
    <div className={classes['sign-in-mw']}>
      <h2 className={classes['sign-in-header']}>Sign In</h2>
      <label className={classes['email-address-label']}>
        Email address
        <Input className={classes['email-address-input']} placeholder={'Email address'}></Input>
      </label>
      <label className={classes['password-label']}>
        Password
        <Input.Password
          iconRender={(visible) => visible}
          className={classes['password-input']}
          placeholder={'Password'}
        ></Input.Password>
      </label>
      <Button type="primary" className={classes['login-button']}>
        Login
      </Button>
      <div className={classes['sign-in-text']}>
        {"Don't have an account?"}
        <Link className={classes['sign-up-button']}>Sign Up.</Link>
      </div>
    </div>
  );
};
export default SignIn;
