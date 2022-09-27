import { Tag, Image } from 'antd';
import { format } from 'date-fns';

// import photo from '../../img/content/Photo.png';
import heart from '../../img/decorate/Heart.svg';

import classes from './blog-article-view.module.scss';

const BlogArticleView = (props) => {
  // console.log(props);
  const { title, favoritesCount, tagList, createdAt, description } = props;
  // console.log(slug);
  const { username, image } = props.author;

  const tags = tagList.map((tag, idx) => {
    return (
      <Tag key={idx} className={classes['blog-article-view__tag']}>
        {tag}
      </Tag>
    );
  });
  return (
    <li className={classes['blog-article-view']}>
      <div className={classes['blog-article-view__wrapper']}>
        <div className={classes['blog-article-view__left-side']}>
          <div className={classes['blog-article-view__title-wrapper']}>
            <h3 className={classes['article-title']}>{title}</h3>
            <img src={heart} className={classes['blog-article-view__heart']}></img>
            <span className={classes['blog-article-view__heart-count']}>{favoritesCount}</span>
          </div>
          <div className={classes['blog-article-view__tags-wrapper']}>{tags}</div>
        </div>
        <div className={classes['blog-article-view__right-side']}>
          <div className={classes['blog-article-view__right-side-wraper']}>
            <div className={classes['blog-article-view__info-wraper']}>
              <div className={classes['blog-article-view__name']}>{username}</div>
              <div className={classes['blog-article-view__date']}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</div>
            </div>
            <Image src={image} className={classes['blog-article-view__photo']}></Image>
          </div>
        </div>
      </div>
      <div className={classes['blog-article-view__text']}>{description}</div>
    </li>
  );
};

export default BlogArticleView;
