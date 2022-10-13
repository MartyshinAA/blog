import { Skeleton } from 'antd'

import classes from './ArticlesSkeletonView.module.scss'

const ArticlesSkeletonView = ({ cards }) => {
  return Array(cards)
    .fill()
    .map((item, idx) => (
      <li key={idx} className={classes['ArticlesSkeletonView']}>
        <Skeleton active paragraph={{ rows: 2 }}>
          {item}
        </Skeleton>
      </li>
    ))
}

export default ArticlesSkeletonView
