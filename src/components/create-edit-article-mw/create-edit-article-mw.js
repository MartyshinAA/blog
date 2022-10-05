import { Form, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const { TextArea } = Input;

// import { createArticle } from '../../components/store/thunks/blog-sign-up-thunk';
// import { editArticle } from '../../components/store/thunks/blog-sign-up-thunk';

import classes from './create-edit-article-mw.module.scss';

const headerEdit = <h2 className={classes['article-header']}>Edit article</h2>;
const headerCreate = <h2 className={classes['article-header']}>Create new article</h2>;

const CreateEditArticle = () => {
  const { handleSubmit, reset, control } = useForm({
    mode: 'onBlur',
  });

  const { token } = useSelector((state) => state.loggedUserReducer);

  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  // console.log(slug);
  // console.log(useParams());
  // console.log(tags);
  const edit = slug;

  const tagsContainer = tags.map((_, idx) => (
    <div key={idx} className={classes['tag-wrapper']}>
      <Controller
        control={control}
        name={`tag${idx}`}
        render={({ field }) => (
          <Input {...field} type="text" className={classes['tag-input']} placeholder={'Tag'}></Input>
        )}
      />
      <Button
        ghost
        danger
        type="primary"
        className={classes['delete-button']}
        onClick={() => {
          const newTags = tagsContainer.filter((tag) => +tag.key !== idx);
          // return newTags;
          // console.log(newTags);
          setTags([...newTags]);
        }}
      >
        Delete
      </Button>
    </div>
  ));

  // console.log(tags);
  // console.log(tagsContainer);

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, tagsContainer]);

  useEffect(() => {
    setTags([0]);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    if (!data) {
      dispatch(data);
      reset();
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['create-new-article-mw']}>
      {edit ? headerEdit : headerCreate}
      <label className={classes['title-label']}>Title</label>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input {...field} type="text" className={classes['title-input']} placeholder={'Title'}></Input>
        )}
        rules={{
          required: true,
        }}
      />
      <label className={classes['short-description-label']}>Short description</label>
      <Controller
        control={control}
        name="shortDescription"
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            className={classes['short-description-input']}
            placeholder={'Short description'}
          ></Input>
        )}
        rules={{
          required: true,
        }}
      />
      <label className={classes['text-label']}>Text</label>
      <Controller
        control={control}
        name="text"
        render={({ field }) => (
          <TextArea
            {...field}
            rows={7}
            type="text"
            className={classes['textarea-input']}
            placeholder={'Text'}
          ></TextArea>
        )}
        rules={{
          required: true,
        }}
      />
      <h3 className={classes['tags-title']}>Tags</h3>
      <div className={classes['tag-wrapper-add-tag']}>
        <ul>{tagsContainer}</ul>
        <Button
          ghost
          type="primary"
          className={classes['add-button']}
          onClick={() => {
            setTags([...tags, tags.push()]);
          }}
        >
          Add tag
        </Button>
      </div>
      <Button type="primary" className={classes['send-button']} htmlType="submit">
        Send
      </Button>
    </Form>
  );
};
export default CreateEditArticle;
