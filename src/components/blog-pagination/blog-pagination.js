import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { currentPageActions } from '../store/actions/current-page-actions';

import classes from './blog-pagination.module.scss';

const BlogPagination = () => {
  const { totalCountOfArticlesReducer, currentPageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Pagination
      className={classes['blog-pagination']}
      current={currentPageReducer}
      defaultPageSize={5}
      showSizeChanger=""
      size="small"
      total={totalCountOfArticlesReducer}
      onChange={(event) => dispatch(currentPageActions(event))}
    />
  );
};

export default BlogPagination;
