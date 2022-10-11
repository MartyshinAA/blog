import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import { loadArticles } from '../store/actions/all-articles-actions';
// import { getCurrentArticle } from '../store/thunks/get-current-article-thunk';
import ArticlesSkeletonView from '../articles-skeleton-view';
import BlogArticleView from '../blog-article-view';
import BlogPagination from '../blog-pagination';

const BlogArticles = () => {
  const dispatch = useDispatch();
  const { allArticlesReducer } = useSelector((state) => state);
  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadArticles());
  }, []);

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
  console.log(content);

  return (
    <>
      {skeleton || content}
      <BlogPagination />
    </>
  );
};

export default BlogArticles;
