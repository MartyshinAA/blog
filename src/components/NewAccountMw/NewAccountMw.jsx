import { useEffect } from 'react'
import { Form, Checkbox, Button, Input, Divider } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { signUp } from '../Store/Thunks/BlogSignUpThunk'
import { serverResponseActions } from '../Store/Actions/ServerResponseActions'

import classes from './NewAccountMw.module.scss'

const NewAccount = () => {
  const {
    formState: { errors },
    handleSubmit,
    getValues,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  const { token } = useSelector((state) => state.loggedUserReducer)
  const { serverResponseReducer } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(serverResponseActions(''))
    if (token) {
      navigate('/')
    }
  }, [token])

  const onSubmit = (data) => {
    dispatch(signUp(data))
    dispatch(serverResponseActions(''))
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['create-NewAccountMw']}>
      <h2 className={classes['account-header']}>Create new account</h2>
      <section>
        <label className={classes['username-label']}>Username</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => <Input {...field} placeholder="Username" className={classes['username-input']} />}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
        />
        {serverResponseReducer['username'] && (
          <div className={classes['username-message']}>{`Username ${serverResponseReducer['username']}`}</div>
        )}
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
          }}
        />
        {serverResponseReducer['email'] && (
          <div className={classes['email-message']}>{`Email adress ${serverResponseReducer['email']}`}</div>
        )}
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
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
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
              const password = getValues('password')
              return match === password || 'Password must match'
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
                onChange(e.target.checked)
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
  )
}

export default NewAccount
