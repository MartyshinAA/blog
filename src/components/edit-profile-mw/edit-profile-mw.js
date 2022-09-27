import { Button, Input } from 'antd';

import classes from './edit-profile-mw.module.scss';

const EditProfile = () => {
  return (
    <div className={classes['edit-profile-mw']}>
      <h2 className={classes['edit-profile-header']}>Edit profile</h2>
      <label className={classes['username-label']}>
        Username
        <Input className={classes['username-input']} placeholder={'Username'}></Input>
      </label>
      <label className={classes['email-address-label']}>
        Email address
        <Input className={classes['email-address-input']} placeholder={'Email address'}></Input>
      </label>
      <label className={classes['password-label']}>
        New password
        <Input.Password
          iconRender={(visible) => visible}
          className={classes['password-input']}
          placeholder={'New password'}
        ></Input.Password>
      </label>
      <label className={classes['avatar-image-label']}>
        Avatar image (url)
        <Input className={classes['avatar-image-input']} placeholder={'Avatar image'}></Input>
      </label>
      <Button type="primary" className={classes['save-button']}>
        Save
      </Button>
    </div>
  );
};
export default EditProfile;
