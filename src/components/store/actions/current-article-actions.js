import { BlogGetArticle } from '../../../services/blog-get-article-service';

import { isLoadingActions } from './is-loading-actions';
import { isErrorActions } from './is-error-actions';
export const CURRENT_ARTICLE = 'CURRENT_ARTICLE';

export const currentArticleActions = (article) => ({
  type: CURRENT_ARTICLE,
  article,
});

export const loadArticle = (slug, token) => (dispatch) => {
  dispatch(isErrorActions(false));
  dispatch(currentArticleActions(''));
  BlogGetArticle(slug, token)
    .then((response) => {
      dispatch(isLoadingActions(true));
      dispatch(currentArticleActions(response.data.article));
      dispatch(isLoadingActions(false));
    })
    .catch(() => dispatch(isErrorActions(true)));
};
