import classNames from 'classnames';
import { Link } from 'react-router-dom';

import photo from '../../img/content/Photo.png';

import classes from './blog-header.module.scss';

const BlogHeader = () => {
  let logged = true;

  const loggedIn = (
    <div className={classes['title__right-side']}>
      <Link to="/new-article-mw" name="create-article" className={classes['title__create-article']}>
        Create article
      </Link>
      <div className={classes['title__info-wraper']}>
        <div className={classes['title__user-name']}>John Doe</div>
        <img src={photo} className={classes['title__user-photo']}></img>
      </div>
      <button name="log-out" className={classNames(classes['log-out'], classes['sign-log-buttons'])}>
        Log Out
      </button>
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
    </div>
  );

  return (
    <div className={classes.title}>
      <div className={classes['title__left-side']}>
        <div className={classes['site-name']}>Realworld Blog</div>
      </div>
      {logged ? loggedIn : anonimus}
    </div>
  );
};

export default BlogHeader;
