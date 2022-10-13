import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { currentPageActions } from '../Store/Actions/CurrentPageActions'
import ArticlesSkeletonView from '../ArticlesSkeletonView'
import BlogArticle from '../BlogArticle'
import BlogPagination from '../BlogPagination'
import { getAllArticles } from '../Store/Thunks/GetAllArticlesThunk'
import { serverResponseActions } from '../Store/Actions/ServerResponseActions'

import classes from './MainPage.module.scss'

const MainPage = () => {
  const { allArticlesReducer } = useSelector((state) => state)
  const { token } = useSelector((state) => state.loggedUserReducer)

  const { isErrorReducer } = useSelector((state) => state)
  const { isLoadingReducer } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentPageActions(1))
    dispatch(getAllArticles(0, token))
    dispatch(serverResponseActions(''))
  }, [token])

  const article = allArticlesReducer.map((props) => {
    return (
      <React.Fragment key={props.createdAt}>
        <BlogArticle {...props} />
      </React.Fragment>
    )
  })

  const status = !(isLoadingReducer || isErrorReducer)
  const skeleton = isLoadingReducer && (
    <ul className={classes['skeletons-on-page']}>
      <ArticlesSkeletonView cards={5} />
    </ul>
  )
  const content = status && <ul className={classes['articles-on-page']}>{article}</ul>

  return (
    <>
      {skeleton || content}
      <BlogPagination />
    </>
  )
}

export default MainPage
