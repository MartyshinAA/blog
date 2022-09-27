import { Button, Input } from 'antd';
const { TextArea } = Input;

import classes from './new-article-mw.module.scss';

let edit = true;
const headerEdit = <h2 className={classes['article-header']}>Edit article</h2>;
const headerCreate = <h2 className={classes['article-header']}>Create new article</h2>;
const NewArticle = () => {
  return (
    <div className={classes['create-new-article-mw']}>
      {edit ? headerEdit : headerCreate}
      <label className={classes['title-label']}>
        Title
        <Input className={classes['title-input']} placeholder={'Title'}></Input>
      </label>
      <label className={classes['short-description-label']}>
        Short description
        <Input className={classes['short-description-input']} placeholder={'Short description'}></Input>
      </label>
      <label className={classes['text-label']}>
        Text
        <TextArea className={classes['textarea-input']} rows={7} placeholder="Text" maxLength={6} />
      </label>
      <h3 className={classes['tags-title']}>Tags</h3>
      <div className={classes['tag-wrapper']}>
        <Input className={classes['tag-input']} placeholder={'Tag'} />
        <Button ghost danger type="primary" className={classes['delete-button']}>
          Delete
        </Button>
      </div>
      <div className={classes['tag-wrapper-add-tag']}>
        <Input className={classes['tag-input']} placeholder={'Tag'}></Input>
        <Button ghost danger type="primary" className={classes['delete-button']}>
          Delete
        </Button>
        {/* <Button ghost type="primary" className={classes['add-button-button']}> */}
        <Button ghost type="primary" className={classes['add-button']}>
          Add tag
        </Button>
      </div>
      <Button type="primary" className={classes['send-button']}>
        Send
      </Button>
    </div>
  );
};
export default NewArticle;
