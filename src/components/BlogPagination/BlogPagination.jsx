import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { currentPageActions } from '../Store/Actions/CurrentPageActions'

import classes from './BlogPagination.module.scss'

const BlogPagination = () => {
  const { totalCountOfArticlesReducer, currentPageReducer } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <Pagination
      className={classes['BlogPagination']}
      current={currentPageReducer}
      defaultPageSize={5}
      showSizeChanger=""
      size="small"
      total={totalCountOfArticlesReducer}
      onChange={(event) => dispatch(currentPageActions(event))}
    />
  )
}

export default BlogPagination
