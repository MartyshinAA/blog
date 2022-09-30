import { Checkbox, Button, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';

import classes from './new-account-mw.module.scss';

const NewAccount = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  let wrongPass = true;
  let passNotMatch = true;
  const passAttention = <div className={classes['wrong-pass']}>Your password needs to be at least 6 characters.</div>;
  const repeatPassAttention = <div className={classes['pass-not-match']}>Passwords must match</div>;

  return (
    <for className={classes['create-new-account-mw']}>
      <h2 className={classes['account-header']}>Create new account</h2>
      <label className={classes['username-label']}>
        Username
        <Input className={classes['username-input']} placeholder={'Username'}></Input>
      </label>
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
        {wrongPass && passAttention}
      </label>
      <label className={classes['repeat-password-label']}>
        Repeat Password
        <Input.Password
          iconRender={(visible) => visible}
          className={classes['repeat-password-input']}
          placeholder={'Repeat Password'}
        ></Input.Password>
        {passNotMatch && repeatPassAttention}
      </label>
      <Divider className={classes.divider}></Divider>
      <Checkbox className={classes.agreed} checked onChange={onChange}>
        I agree to the processing of my personal information
      </Checkbox>
      <Button type="primary" className={classes['create-button']}>
        Create
      </Button>
      <div className={classes['sign-in-text']}>
        Already have an account?
        <Link to="/sign-in" className={classes['sign-in-button']}>
          Sign In.
        </Link>
      </div>
    </for>
  );
};
export default NewAccount;
