import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SecureLS from 'secure-ls'

import { signInActions } from '../Store/Actions/SignInActions'
import { getAllArticles } from '../Store/Thunks/GetAllArticlesThunk'

const WrapperUseEffect = () => {
  const ls = new SecureLS()
  const { currentPageReducer } = useSelector((state) => state)
  const { token } = useSelector((state) => state.loggedUserReducer)
  const { loggedUserReducer } = useSelector((state) => state)
  const dispatch = useDispatch()
  const currentOffset = currentPageReducer * 5 - 5
  useEffect(() => {
    dispatch(getAllArticles(currentOffset, token))
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [currentPageReducer, token])

  useEffect(() => {
    if (ls.get('loggedUserReducer')) {
      dispatch(signInActions(JSON.parse(ls.get('loggedUserReducer'))))
    }
  }, [])

  useEffect(() => {
    ls.set('loggedUserReducer', JSON.stringify(loggedUserReducer))
  }, [loggedUserReducer])
}

export default WrapperUseEffect
