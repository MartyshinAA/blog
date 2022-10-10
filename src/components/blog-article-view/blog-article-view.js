import { Tag, Image } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { likeArticle } from '../store/thunks/like-article-thunk';
// import { dislikeArticle } from '../store/thunks/dislike-article-thunk';

import classes from './blog-article-view.module.scss';

const BlogArticleView = (props) => {
  const dispatch = useDispatch();
  const { slug, title, favoritesCount, tagList, createdAt, description } = props;
  const { username, image } = props.author;
  const { token } = useSelector((state) => state.loggedUserReducer);

  const tags = tagList.map((tag, idx) => {
    return (
      <Tag key={idx} className={classes['blog-article-view__tag']}>
        {tag}
      </Tag>
    );
  });

  const { favorited } = useSelector((state) => state.currentArticleReducer);
  console.log(favorited);

  const mainContent = (
    <li className={classes['blog-article-view']}>
      {/* <Skeleton loading={isLoadingReducer} active paragraph={{ rows: 2 }}> */}
      <div className={classes['blog-article-view__wrapper']}>
        <div className={classes['blog-article-view__left-side']}>
          <div className={classes['blog-article-view__title-wrapper']}>
            <Link to={`/articles/${slug}`} name="title" className={classes['article-title']} state={{ props }}>
              {title}
            </Link>
            {/* <img src={heart} className={classes['blog-article-view__heart']}></img> */}
            {/* <span className={classes['blog-article-view__heart-count']}>{favoritesCount}</span> */}
            <label className={classes['checkbox']}>
              <input
                className={classes['checkbox__input']}
                type="checkbox"
                id="heart"
                name="heart"
                // disabled
                // checked={allTransfers}
                onChange={() => dispatch(likeArticle(slug, token))}
              ></input>
              <span className={classes['checkbox__span']}></span>
              {favoritesCount}
            </label>
          </div>
          <div className={classes['blog-article-view__tags-wrapper']}>{tags}</div>
        </div>
        <div className={classes['blog-article-view__right-side']}>
          <div className={classes['blog-article-view__right-side-wraper']}>
            <div className={classes['blog-article-view__info-wraper']}>
              <div className={classes['blog-article-view__name']}>{username}</div>
              <div className={classes['blog-article-view__date']}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</div>
            </div>
            <Image src={image} preview={false} className={classes['blog-article-view__photo']} alt="avatar"></Image>
          </div>
        </div>
      </div>
      <div className={classes['blog-article-view__text']}>{description}</div>
      {/* </Skeleton> */}
    </li>
  );

  return mainContent;
};

export default BlogArticleView;
