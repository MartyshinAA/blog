import { useEffect } from 'react';
import { Form, Checkbox, Button, Input, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { signUp } from '../../components/store/thunks/blog-sign-up-thunk';

import classes from './new-account-mw.module.scss';

const NewAccount = () => {
  const {
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    control,
  } = useForm({
    mode: 'onBlur',
  });

  const { token } = useSelector((state) => state.loggedUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onSubmit = (data) => {
    dispatch(signUp(data));
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['create-new-account-mw']}>
      <h2 className={classes['account-header']}>Create new account</h2>
      <section>
        <label className={classes['username-label']}>Username</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => <Input {...field} placeholder="Username" className={classes['username-input']} />}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
        />
      </section>
      <section>
        <label className={classes['email-address-label']}>Email address</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              className={classes['email-address-input']}
              placeholder={'Email address'}
            ></Input>
          )}
          rules={{
            required: true,
            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'invalid email address' },
          }}
        />
      </section>
      <section>
        <label className={classes['password-label']}>Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              className={classes['password-input']}
              iconRender={() => {}}
              placeholder={'Password'}
            />
          )}
          rules={{
            required: true,
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: 40,
          }}
        />
        {errors.password && <div className={classes['wrong-pass']}>{errors.password.message}</div>}
      </section>
      <section>
        <label className={classes['repeat-password-label']}>Repeat Password</label>
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              className={classes['repeat-password-input']}
              iconRender={() => {}}
              placeholder={'Repeat Password'}
            />
          )}
          rules={{
            required: true,
            validate: (match) => {
              const password = getValues('password');
              return match === password || 'Password must match';
            },
          }}
        />
        {errors.repeatPassword && <div className={classes['pass-not-match']}>{errors.repeatPassword.message}</div>}
      </section>
      <Divider className={classes.divider}></Divider>
      <section className={classes.agreed}>
        <Controller
          control={control}
          name="Checkbox"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              required
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          )}
        />
        <label>I agree to the processing of my personal information</label>
      </section>
      <Button type="primary" className={classes['create-button']} htmlType="submit">
        Create
      </Button>
      <div className={classes['sign-in-text']}>
        Already have an account?
        <Link to="/sign-in" className={classes['sign-in-button']}>
          Sign In.
        </Link>
      </div>
    </Form>
  );
};

export default NewAccount;
