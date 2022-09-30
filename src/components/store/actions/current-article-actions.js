import { BlogGetArticle } from '../../../services/blog-get-article-service';

import { isLoadingActions } from './is-loading-actions';
import { isErrorActions } from './is-error-actions';
export const CURRENT_ARTICLE = 'CURRENT_ARTICLE';

const currentArticleActions = (article) => ({
  type: CURRENT_ARTICLE,
  article,
});

export const loadArticle = (slug) => (dispatch) => {
  dispatch(isLoadingActions(true));
  dispatch(isErrorActions(false));
  dispatch(currentArticleActions(''));
  BlogGetArticle(slug)
    .then((response) => {
      dispatch(isLoadingActions(false));
      const { article } = response.data;
      dispatch(currentArticleActions(article));
    })
    .catch(() => dispatch(isErrorActions(true)));
};
