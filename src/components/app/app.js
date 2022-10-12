import 'normalize.css';
import './app.scss';
import 'antd/dist/antd.min.css';

import { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// added encryption just in case
import SecureLS from 'secure-ls';

import { getAllArticles } from '../store/thunks/get-all-articles-thunk';
import { store } from '../store/store';
import BlogHeader from '../blog-header';
import NewAccount from '../new-account-mw';
import SignIn from '../sign-in-mw/sign-in-mw';
import EditProfile from '../edit-profile-mw';
import BlogArticles from '../blog-articles';
import BlogArticle from '../blog-article';
import CreateArticle from '../create-article-mw';
import EditArticle from '../edit-article-mw';
import { signInActions } from '../store/actions/sign-in-actions';
// import { currentArticleActions } from '../store/actions/current-article-actions';

const App = () => {
  const ls = new SecureLS();
  const WrapperUseEffect = () => {
    const { currentPageReducer } = useSelector((state) => state);
    // const { currentArticleReducer } = useSelector((state) => state);
    const { token } = useSelector((state) => state.loggedUserReducer);
    const { loggedUserReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const currentOffset = currentPageReducer * 5 - 5;
    useEffect(() => {
      dispatch(getAllArticles(currentOffset, token));
    }, [currentPageReducer, token]);

    useEffect(() => {
      if (ls.get('loggedUserReducer')) {
        dispatch(signInActions(JSON.parse(ls.get('loggedUserReducer'))));
        // dispatch(currentArticleActions(JSON.parse(ls.get('currentArticleReducer'))));
      }
    }, []);

    useEffect(() => {
      ls.set('loggedUserReducer', JSON.stringify(loggedUserReducer));
      // ls.set('currentArticleReducer', JSON.stringify(currentArticleReducer));
    }, [/*currentArticleReducer*/ loggedUserReducer]);
  };

  return (
    <Provider store={store}>
      <WrapperUseEffect />
      <BlogHeader />
      <Routes>
        <Route path="/" element={<BlogArticles />} />
        <Route path="/articles" element={<BlogArticles />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug" element={<BlogArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<NewAccount />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="*" element={<BlogArticles />} />
      </Routes>
    </Provider>
  );
};

export default App;
