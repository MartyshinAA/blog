import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Image, Button, message } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { serverResponseActions } from '../store/actions/server-response-actions';
// import { isLogged } from '../store/thunks/is-logged-thunk';
import { signInActions } from '../store/actions/sign-in-actions';

import classes from './blog-header.module.scss';

const BlogHeader = () => {
  const { serverResponseReducer } = useSelector((state) => state);
  const { username, image, token } = useSelector((state) => state.loggedUserReducer);

  const dispatch = useDispatch();

  const serverResponseMessage = () => {
    if (Object.keys(serverResponseReducer).length) {
      message.warning(JSON.stringify(serverResponseReducer).replaceAll('"', ' '));
      dispatch(serverResponseActions(''));
    }
  };

  useEffect(() => serverResponseMessage(), [serverResponseReducer]);

  const logged = Boolean(token);

  const loggedIn = (
    <div className={classes['title__right-side']}>
      <Link to="/new-article" name="create-article" className={classes['title__create-article']}>
        Create article
      </Link>
      <Link to="/profile" className={classes['title__info-wraper']}>
        <div className={classes['title__user-name']}>{username}</div>
        <Image preview={false} src={image} className={classes['title__user-photo']} alt={'avatar'}></Image>
      </Link>
      <Button
        name="log-out"
        className={classNames(classes['log-out'], classes['sign-log-buttons'])}
        onClick={() => dispatch(signInActions({}))}
      >
        Log Out
      </Button>
    </div>
  );

  const anonimus = (
    <div className={classes['title__right-side']}>
      <Link to="/sign-in" name="sign-in" className={classes['sign-in']}>
        Sign In
      </Link>
      <Link to="/sign-up" name="sign-up" className={classNames(classes['sign-up'], classes['sign-log-buttons'])}>
        Sign Up
      </Link>
      {/* <button onClick={() => dispatch(isLogged())}>Status</button> */}
    </div>
  );

  return (
    <div className={classes.title}>
      <div className={classes['title__left-side']}>
        <Link to={'/'} className={classes['site-name']}>
          Realworld Blog
        </Link>
      </div>
      {logged ? loggedIn : anonimus}
    </div>
  );
};

export default BlogHeader;
