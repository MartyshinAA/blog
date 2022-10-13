import 'normalize.css'
import './App.scss'
import 'antd/dist/antd.min.css'

import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
// added encryption just in case
// import SecureLS from 'secure-ls'

import { store } from '../Store/Store'
import BlogHeader from '../BlogHeader'
import NewAccount from '../NewAccountMw'
import SignIn from '../SignInMw'
import EditProfile from '../EditProfileMw'
import MainPage from '../MainPage'
import BlogArticle from '../BlogArticle'
import CreateArticle from '../CreateArticleMw'
import EditArticle from '../EditArticleMw'
import WrapperUseEffect from '../WrapperUseEffect'

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
