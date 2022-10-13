import ReactMarkdown from 'react-markdown'
import { Tag, Button, message, Popconfirm, Image } from 'antd'
import { format } from 'date-fns'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCurrentArticle } from '../Store/Thunks/GetCurrentArticleThunk'
import ArticlesSkeletonView from '../ArticlesSkeletonView'
import { deleteArticle } from '../Store/Thunks/DeleteArticleThunk'
import { likeArticle } from '../Store/Thunks/LikeArticleThunk'
import { dislikeArticle } from '../Store/Thunks/DislikeArticleThunk'

import classesMain from './BlogArticle.module.scss'
import previewClasses from './BlogArticlePreview.module.scss'

const BlogArticle = (props) => {
  const { slug: slugProps } = props
  //Store content

  let classes
  !slugProps ? (classes = classesMain) : (classes = previewClasses)

  const { token, username } = useSelector((state) => state.loggedUserReducer)
  const { isErrorReducer } = useSelector((state) => state)
  const { isLoadingReducer } = useSelector((state) => state)
  const { currentArticleReducer } = useSelector((state) => state)
  const { allArticlesReducer } = useSelector((state) => state)

  let logged = token

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug: slugParams } = useParams()
  const articleName = slugParams || slugProps
  let currentArticleInfo
  if (slugProps) {
    currentArticleInfo = allArticlesReducer.filter((article) => article.slug === articleName)
  }

  useEffect(() => {
    dispatch(getCurrentArticle(articleName, token))
  }, [token])

  //fill default content if data not uploaded

  let content = (
    <ul>
      <ArticlesSkeletonView cards={1} />
    </ul>
  )

  //Popconfirm content

  const text = 'Are you sure to delete this article?'

  const confirm = () => {
    dispatch(deleteArticle(articleName, token))
    message.info('Article deleted.')
    navigate('/')
  }

  //Logged buttons content

  const buttons = (
    <div className={classes['BlogArticle__button-wrapper']}>
      <Popconfirm
        className={classes['confirm-button']}
        placement="rightTop"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button ghost danger type="primary" className={classes['delete-button']}>
          Delete
        </Button>
      </Popconfirm>
      <Button ghost type="primary" className={classes['edit-button']}>
        <Link to={`/articles/${articleName}/edit`}>Edit</Link>
      </Button>
    </div>
  )

  //if data is uploaded
  let currentArticle
  if (slugProps) {
    currentArticle = currentArticleInfo[0]
  } else if (slugParams) {
    currentArticle = currentArticleReducer
  }

  if (Object.keys(currentArticle).length > 0) {
    const { body, title, description, createdAt, favorited, favoritesCount, tagList } = currentArticle
    const { username: author, image } = currentArticle.author

    const setLikeDislike = () => {
      if (favorited) {
        dispatch(dislikeArticle(articleName, token))
      } else {
        dispatch(likeArticle(articleName, token))
      }
    }
    const tags = tagList.map((tag, idx) => {
      if (tag === null) return
      return (
        <Tag key={idx} className={classes['BlogArticle-view__tag']}>
          {tag}
        </Tag>
      )
    })
    content = (
      <li className={classes['BlogArticle']}>
        <div className={classes['BlogArticle__wrapper']}>
          <div className={classes['BlogArticle__left-side']}>
            <div className={classes['BlogArticle__title-wrapper']}>
              <h3 className={classes['article-title']}>
                {slugProps ? (
                  <Link to={`/articles/${articleName}`} name="title" className={classes['article-title']}>
                    {title}
                  </Link>
                ) : (
                  <span className={classes['article-title']}>{title}</span>
                )}
              </h3>
              <label className={classes['checkbox']}>
                <input
                  className={classes['checkbox__input']}
                  type="checkbox"
                  id="heart"
                  name="heart"
                  disabled={!logged}
                  checked={favorited}
                  onChange={() => setLikeDislike()}
                ></input>
                <span className={classes['checkbox__span']}></span>
                {favoritesCount}
              </label>
            </div>
            <div className={classes['BlogArticle__tags-wrapper']}>{tags}</div>
          </div>
          <div className={classes['BlogArticle__right-side']}>
            <div className={classes['BlogArticle__right-side-wraper']}>
              <div className={classes['BlogArticle__info-wraper']}>
                <div className={classes['BlogArticle__name']}>{author}</div>
                <div className={classes['BlogArticle__date']}>
                  {createdAt && format(new Date(createdAt), 'MMMM dd, yyyy')}
                </div>
              </div>
              <Image src={image} className={classes['BlogArticle__photo']} alt="avatar" preview={false}></Image>
            </div>
          </div>
        </div>
        <div className={classes['BlogArticle__short-text-wrapper']}>
          <div className={classes['BlogArticle__text']}>{description}</div>
          <div className={classes['BlogArticle__button-wrapper']}>
            {logged && username === author && !slugProps && buttons}
          </div>
        </div>
        {slugParams && <ReactMarkdown className={classes['text-content']}>{body}</ReactMarkdown>}
      </li>
    )
  }

  const statusOk = !(isLoadingReducer || isErrorReducer)

  return <>{statusOk && content}</>
}

export default BlogArticle
