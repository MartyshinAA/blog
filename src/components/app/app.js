import 'normalize.css';
import './app.scss';
import 'antd/dist/antd.min.css';

import { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// added encryption just in case
import SecureLS from 'secure-ls';

import { loadArticles } from '../store/actions/all-articles-actions';
import { store } from '../store/store';
import BlogHeader from '../blog-header';
import NewAccount from '../new-account-mw';
import SignIn from '../sign-in-mw/sign-in-mw';
import EditProfile from '../edit-profile-mw';
import BlogArticles from '../blog-articles';
import BlogArticle from '../blog-article';
import CreateEditArticle from '../create-edit-article-mw';
import { signInActions } from '../store/actions/sign-in-actions';

const App = () => {
  const ls = new SecureLS();
  const WrapperUseEffect = () => {
    const { currentPageReducer } = useSelector((state) => state);
    const { loggedUserReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const currentOffset = currentPageReducer * 5 - 5;
    useEffect(() => {
      dispatch(loadArticles(currentOffset));
    }, [currentPageReducer]);

    useEffect(() => {
      if (JSON.parse(ls.get('loggedUserReducer'))) {
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
        <Route path="/" element={<BlogArticles />} />
        <Route path="/articles" element={<BlogArticles />} />
        <Route path="/new-article" element={<CreateEditArticle />} />
        <Route path="/articles/:slug/edit" element={<CreateEditArticle />} />
        <Route path="/articles/:slug" element={<BlogArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<NewAccount />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="*" element={<BlogArticles />} />
      </Routes>
    </Provider>
  );
};

export default App;
