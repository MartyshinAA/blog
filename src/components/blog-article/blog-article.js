import ReactMarkdown from 'react-markdown';
import { Tag, Button, message, Popconfirm, Image } from 'antd';
import { format } from 'date-fns';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { loadArticle } from '../store/actions/current-article-actions';
import { getCurrentArticle } from '../store/thunks/get-current-article-thunk';
import ArticlesSkeletonView from '../articles-skeleton-view';
import { deleteArticle } from '../store/thunks/delete-article-thunk';
import { likeArticle } from '../store/thunks/like-article-thunk';
import { dislikeArticle } from '../store/thunks/dislike-article-thunk';

// import { editArticle } from '../store/thunks/edit-article-thunk';

import '../delete-mw/delete-mw.scss';
import classes from './blog-article.module.scss';

const BlogArticle = () => {
  //Store content

  const { token } = useSelector((state) => state.loggedUserReducer);
  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);
  const { currentArticleReducer } = useSelector((state) => state);
  const { loggedUserReducer } = useSelector((state) => state);
  // const { deleteArticleReducer } = useSelector((state) => state);

  let logged = token;

  // console.log(isLoadingReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  console.log(slug);

  //Startup action

  useEffect(() => {
    dispatch(getCurrentArticle(slug, token));
  }, []);

  // console.log(deleteArticleReducer, navigate);

  // useEffect(() => {
  //   navigate('/');
  // }, [deleteArticleReducer]);

  //fill default content if data not uploaded

  let content = (
    <ul>
      <ArticlesSkeletonView cards={1} />
    </ul>
  );

  //Popconfirm content

  console.log(navigate);

  const text = 'Are you sure to delete this article?';

  const confirm = () => {
    console.log(slug, token);
    dispatch(deleteArticle(slug, token));
    message.info('Article deleted.');
    // не совсем верное решение, т.к. сервер может не ответить и лучше поставить это действие в thunk но не хочется смешивать логику и рендеринг
    setTimeout(() => navigate('/'), 1000);
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
        <Link to={`/articles/${slug}/edit`}>Edit</Link>
      </Button>
    </div>
  );

  //if data is uploaded

  if (Object.keys(currentArticleReducer).length > 0) {
    let { title, description, body, createdAt, favorited, favoritesCount, tagList } = currentArticleReducer;
    const { username, image } = currentArticleReducer.author;
    console.log(favorited);
    const setLikeDislike = () => {
      if (favorited) {
        dispatch(dislikeArticle(slug, token));
      } else {
        dispatch(likeArticle(slug, token));
      }
    };
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
                  disabled={!logged}
                  checked={favorited}
                  onChange={() => setLikeDislike()}
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
          <div className={classes['blog-article__button-wrapper']}>
            {logged && loggedUserReducer.username === username && buttons}
          </div>
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
