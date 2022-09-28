import { useSelector } from 'react-redux';
import React from 'react';

import ArticlesSkeletonView from '../articles-skeleton-view';
import BlogArticleView from '../blog-article-view';
import BlogPagination from '../blog-pagination';

const BlogArticles = () => {
  const { allArticlesReducer } = useSelector((state) => state);
  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);

  const article = allArticlesReducer.map((props) => {
    return (
      <React.Fragment key={props.createdAt}>
        <BlogArticleView {...props} />
      </React.Fragment>
    );
  });

  const status = !(isLoadingReducer || isErrorReducer);
  const skeleton = isLoadingReducer && (
    <ul>
      <ArticlesSkeletonView cards={5} />
    </ul>
  );
  const content = status && <ul>{article}</ul>;

  return (
    <>
      {skeleton || content}
      <BlogPagination />
    </>
  );
};

export default BlogArticles;
