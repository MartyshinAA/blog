import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import React from 'react';

import { currentPageActions } from '../store/actions/current-page-actions';
import ArticlesSkeletonView from '../articles-skeleton-view';
import BlogArticle from '../blog-article';
import BlogPagination from '../blog-pagination';
import { getAllArticles } from '../store/thunks/get-all-articles-thunk';

const BlogArticles = () => {
  const { allArticlesReducer } = useSelector((state) => state);
  const { token } = useSelector((state) => state.loggedUserReducer);

  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);

  // const { currentArticleReducer } = useSelector((state) => state);
  // const { favorited } = useSelector((state) => state.currentArticleReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPageActions(1));
    dispatch(getAllArticles(0, token));
  }, [token]);
  // useEffect(() => {
  //   dispatch(getCurrentArticle(articleName, token));
  // }, [token]);

  const article = allArticlesReducer.map((props) => {
    return (
      <React.Fragment key={props.createdAt}>
        <BlogArticle {...props} />
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
