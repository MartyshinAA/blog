import 'normalize.css'
import './App.scss'
import 'antd/dist/antd.min.css'

import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
// added encryption just in case
// import SecureLS from 'secure-ls'

import { store } from '../src/redux/store'
import BlogHeader from '../src/components/BlogHeader'
import NewAccount from '../src/pages/NewAccountMw'
import SignIn from '../src/pages/SignInMw'
import EditProfile from '../src/pages/EditProfileMw'
import MainPage from '../src/pages/MainPage'
import BlogArticle from '../src/pages/BlogArticle'
import CreateArticle from '../src/pages/CreateArticleMw'
import EditArticle from '../src/pages/EditArticleMw'
import WrapperUseEffect from '../src/utils/wrapperUseEffect'

const App = () => {
  return (
    <Provider store={store}>
      <WrapperUseEffect />
      <BlogHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/articles" element={<MainPage />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug" element={<BlogArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<NewAccount />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Provider>
  )
}

export default App
