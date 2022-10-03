import { Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { signIn } from '../../components/store/thunks/blog-sign-in-thunk';

import classes from './sign-in-mw.module.scss';

const SignIn = () => {
  const { handleSubmit, reset, control } = useForm({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signIn(data));
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['sign-in-mw']}>
      <h2 className={classes['sign-in-header']}>Sign In</h2>
      <section>
        <label className={classes['email-address-label']}>Email address</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              onBlur={field.onBlur}
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
          }}
        />
      </section>
      <Button type="primary" htmlType="submit" className={classes['login-button']}>
        Login
      </Button>
      <div className={classes['sign-in-text']}>
        {"Don't have an account?"}
        <Link to="/sign-up" className={classes['sign-up-button']}>
          Sign Up.
        </Link>
      </div>
    </Form>
  );
};
export default SignIn;
