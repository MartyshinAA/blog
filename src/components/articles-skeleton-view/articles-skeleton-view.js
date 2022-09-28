import { Skeleton } from 'antd';

import classes from './articles-skeleton-view.module.scss';

const ArticlesSkeletonView = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, idx) => (
      <li key={idx} className={classes['articles-skeleton-view']}>
        <Skeleton active paragraph={{ rows: 2 }}></Skeleton>
      </li>
    ));
};

export default ArticlesSkeletonView;
