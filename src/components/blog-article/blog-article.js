import ReactMarkdown from 'react-markdown';
import { Tag, Button, message, Popconfirm } from 'antd';

import photo from '../../img/content/Photo.png';
import '../delete-mw/delete-mw.scss';

import classes from './blog-article.module.scss';

const BlogArticle = () => {
  let logged = true;

  const text = 'Are you sure to delete this article?';

  const confirm = () => {
    message.info('Article deleted.');
  };

  const buttons = (
    <div className={classes['blog-article__button-wrapper']}>
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
        Edit
      </Button>
    </div>
  );

  return (
    <div className={classes['blog-article']}>
      <div className={classes['blog-article__wrapper']}>
        <div className={classes['blog-article__left-side']}>
          <div className={classes['blog-article__title-wrapper']}>
            <h3 className={classes['article-title']}>Some article title</h3>
            <label className={classes['checkbox']}>
              <input
                className={classes['checkbox__input']}
                type="checkbox"
                id="heart"
                name="heart"
                // checked={allTransfers}
                // onChange={() => dispatch(allTransfersActions())}
              ></input>
              <span className={classes['checkbox__span']}></span>
              12
            </label>
          </div>
          <div className={classes['blog-article__tags-wrapper']}>
            <Tag className={classes['blog-article__tag']}>Tag1</Tag>
            <Tag className={classes['blog-article__tag']}>SomeTag</Tag>
          </div>
        </div>
        <div className={classes['blog-article__right-side']}>
          <div className={classes['blog-article__right-side-wraper']}>
            <div className={classes['blog-article__info-wraper']}>
              <div className={classes['blog-article__name']}>John Doe</div>
              <div className={classes['blog-article__date']}>March 5, 2020</div>
            </div>
            <img src={photo} className={classes['blog-article__photo']}></img>
          </div>
        </div>
      </div>
      <div className={classes['blog-article__short-text-wrapper']}>
        <div className={classes['blog-article__text']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </div>
        <div className={classes['blog-article__button-wrapper']}>{logged && buttons}</div>
      </div>
      <ReactMarkdown className={classes['text-content']}>
        Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
        Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
        responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes
        ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides: aethere
        Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc,
        hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus
        draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris includere
        etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
      </ReactMarkdown>
    </div>
  );
};

export default BlogArticle;
