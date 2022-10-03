import { Form, Button, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import classes from './edit-profile-mw.module.scss';

const EditProfile = () => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['edit-profile-mw']}>
      <h2 className={classes['edit-profile-header']}>Edit profile</h2>
      <section>
        <label className={classes['username-label']}>Username</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => <Input {...field} placeholder="Username" className={classes['username-input']} />}
          rules={{ required: true }}
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
          name="avatarImage"
          render={({ field }) => (
            <Input
              {...field}
              // onBlur={field.onBlur}
              type="url"
              className={classes['avatar-image-input']}
              placeholder={'Avatar image'}
            ></Input>
          )}
          // rules={{
          //   pattern: {
          //     value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
          //   },
          // }}
        />
      </section>
      <Button type="primary" htmlType="submit" className={classes['save-button']}>
        Save
      </Button>
    </Form>
  );
};
export default EditProfile;
