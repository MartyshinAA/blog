import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import { currentPageActions } from '../store/actions/current-page-actions';
import ArticlesSkeletonView from '../articles-skeleton-view';
import BlogArticle from '../blog-article';
import BlogPagination from '../blog-pagination';
import { getAllArticles } from '../store/thunks/get-all-articles-thunk';

import classes from './main-page.module.scss';

const MainPage = () => {
  const { allArticlesReducer } = useSelector((state) => state);
  const { token } = useSelector((state) => state.loggedUserReducer);

  const { isErrorReducer } = useSelector((state) => state);
  const { isLoadingReducer } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPageActions(1));
    dispatch(getAllArticles(0, token));
  }, [token]);

  const article = allArticlesReducer.map((props) => {
    return (
      <React.Fragment key={props.createdAt}>
        <BlogArticle {...props} />
      </React.Fragment>
    );
  });

  const status = !(isLoadingReducer || isErrorReducer);
  const skeleton = isLoadingReducer && (
    <ul className={classes['skeletons-on-page']}>
      <ArticlesSkeletonView cards={5} />
    </ul>
  );
  const content = status && <ul className={classes['articles-on-page']}>{article}</ul>;

  return (
    <>
      {skeleton || content}
      <BlogPagination />
    </>
  );
};

export default MainPage;
