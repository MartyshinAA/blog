import 'normalize.css';
import './app.scss';
import 'antd/dist/antd.min.css';

import { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// added encryption just in case
import SecureLS from 'secure-ls';

import { store } from '../store/store';
import BlogHeader from '../blog-header';
import NewAccount from '../new-account-mw';
import SignIn from '../sign-in-mw';
import EditProfile from '../edit-profile-mw';
import MainPage from '../main-page';
import BlogArticle from '../blog-article';
import CreateArticle from '../create-article-mw';
import EditArticle from '../edit-article-mw';
import { signInActions } from '../store/actions/sign-in-actions';
import { getAllArticles } from '../store/thunks/get-all-articles-thunk';

const App = () => {
  const ls = new SecureLS();
  const WrapperUseEffect = () => {
    const { currentPageReducer } = useSelector((state) => state);
    const { token } = useSelector((state) => state.loggedUserReducer);
    const { loggedUserReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const currentOffset = currentPageReducer * 5 - 5;
    useEffect(() => {
      dispatch(getAllArticles(currentOffset, token));
      scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [currentPageReducer, token]);

    useEffect(() => {
      if (ls.get('loggedUserReducer')) {
        dispatch(signInActions(JSON.parse(ls.get('loggedUserReducer'))));
      }
    }, []);

    useEffect(() => {
      ls.set('loggedUserReducer', JSON.stringify(loggedUserReducer));
    }, [loggedUserReducer]);
  };

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
  );
};

export default App;
