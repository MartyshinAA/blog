// import classes from './blog-articles.module.scss';
import { useSelector } from 'react-redux';
import React from 'react';

import BlogArticleView from '../blog-article-view';
import BlogPagination from '../blog-pagination';

const BlogArticles = () => {
  // const dispatch = useDispatch();
  const { allArticlesReducer } = useSelector((state) => state);

  const article = allArticlesReducer.map((props) => {
    return (
      <React.Fragment key={props.createdAt}>
        <BlogArticleView {...props} />
      </React.Fragment>
    );
  });
  return (
    <>
      <ul>{article}</ul>
      <BlogPagination />
    </>
  );
};

export default BlogArticles;
