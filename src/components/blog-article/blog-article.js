import ReactMarkdown from 'react-markdown';
import { Tag, Button, message, Popconfirm, Image } from 'antd';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadArticle } from '../store/actions/current-article-actions';
import ArticlesSkeletonView from '../articles-skeleton-view';

import '../delete-mw/delete-mw.scss';
import classes from './blog-article.module.scss';

const BlogArticle = () => {
  //Popconfirm content

  const text = 'Are you sure to delete this article?';

  const confirm = () => {
    message.info('Article deleted.');
  };

  //Logged buttons content

  const buttons = (
    <div className={classes['blog-article__button-wrapper']}>
      <Popconfirm
        className={classes['confirm-button']}
        placement="rightTop"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button ghost danger type="primary" className={classes['delete-button']}>
          Delete
        </Button>
      </Popconfirm>
      <Button ghost type="primary" className={classes['edit-button']}>
        Edit
      </Button>
    </div>
  );

  //Store content

  const { token } = useSelector((state) => state.loggedUserReducer);
  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);
  const { currentArticleReducer } = useSelector((state) => state);

  let logged = token;

  // console.log(isLoadingReducer);

  const dispatch = useDispatch();
  const { slug } = useParams();

  //Startup action

  useEffect(() => {
    dispatch(loadArticle(slug));
  }, []);

  //fill default content if data not uploaded

  let content = (
    <ul>
      <ArticlesSkeletonView cards={1} />
    </ul>
  );

  //if data is uploaded

  if (Object.keys(currentArticleReducer).length > 0) {
    let { title, description, body, createdAt, favoritesCount, tagList } = currentArticleReducer;
    let { username, image } = currentArticleReducer.author;
    const tags = tagList.map((tag, idx) => {
      return (
        <Tag key={idx} className={classes['blog-article-view__tag']}>
          {tag}
        </Tag>
      );
    });
    content = (
      <div className={classes['blog-article']}>
        <div className={classes['blog-article__wrapper']}>
          <div className={classes['blog-article__left-side']}>
            <div className={classes['blog-article__title-wrapper']}>
              <h3 className={classes['article-title']}>{title}</h3>
              <label className={classes['checkbox']}>
                <input
                  className={classes['checkbox__input']}
                  type="checkbox"
                  id="heart"
                  name="heart"
                  disabled
                  // checked={allTransfers}
                  // onChange={() => dispatch(allTransfersActions())}
                ></input>
                <span className={classes['checkbox__span']}></span>
                {favoritesCount}
              </label>
            </div>
            <div className={classes['blog-article__tags-wrapper']}>{tags}</div>
          </div>
          <div className={classes['blog-article__right-side']}>
            <div className={classes['blog-article__right-side-wraper']}>
              <div className={classes['blog-article__info-wraper']}>
                <div className={classes['blog-article__name']}>{username}</div>
                <div className={classes['blog-article__date']}>
                  {createdAt && format(new Date(createdAt), 'MMMM dd, yyyy')}
                </div>
              </div>
              <Image src={image} className={classes['blog-article__photo']} alt="avatar" preview={false}></Image>
            </div>
          </div>
        </div>
        <div className={classes['blog-article__short-text-wrapper']}>
          <div className={classes['blog-article__text']}>{description}</div>
          <div className={classes['blog-article__button-wrapper']}>{logged && buttons}</div>
        </div>
        <div data-color-mode="light">
          <ReactMarkdown className={classes['text-content']}>{body}</ReactMarkdown>
        </div>
      </div>
    );
  }

  const statusOk = !(isLoadingReducer || isErrorReducer);

  return <>{statusOk && content}</>;
};

export default BlogArticle;
