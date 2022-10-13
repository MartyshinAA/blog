import { Form, Button, Input } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { serverResponseActions } from '../Store/Actions/ServerResponseActions'
import { editProfile } from '../Store/Thunks/BlogEditProfileThunk'

import classes from './EditProfileMw.module.scss'

const EditProfile = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { serverResponseReducer } = useSelector((state) => state)
  const { username, email, token, image } = useSelector((state) => state.loggedUserReducer)

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  const onSubmit = (data) => {
    dispatch(editProfile(data, token))
    dispatch(serverResponseActions(''))
    navigate('/')
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['EditProfileMw']}>
      <h2 className={classes['edit-profile-header']}>Edit profile</h2>
      <section>
        <label className={classes['username-label']}>Username</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input {...field} placeholder="Username" className={classes['username-input']} defaultValue={username} />
          )}
          rules={{ required: true }}
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
              onBlur={field.onBlur}
              type="email"
              className={classes['email-address-input']}
              placeholder={'Email address'}
              defaultValue={email}
            ></Input>
          )}
          rules={{
            required: true,
          }}
        />
        {serverResponseReducer['username'] && (
          <div className={classes['email-message']}>{`Email adress ${serverResponseReducer['email']}`}</div>
        )}
      </section>
      <section>
        <label className={classes['password-label']}>New password</label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              className={classes['password-input']}
              iconRender={() => {}}
              placeholder={'New password'}
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
        <label className={classes['avatar-image-label']}>Avatar image (url)</label>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Input
              {...field}
              type="url"
              className={classes['avatar-image-input']}
              placeholder={'Avatar image'}
              defaultValue={image}
            ></Input>
          )}
        />
      </section>
      <Button type="primary" htmlType="submit" className={classes['save-button']}>
        Save
      </Button>
    </Form>
  )
}
export default EditProfile
