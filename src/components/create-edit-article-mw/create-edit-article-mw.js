import { Form, Button, Input } from 'antd';
import { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const { TextArea } = Input;

// import { createArticle } from '../../components/store/thunks/blog-sign-up-thunk';
// import { editArticle } from '../../components/store/thunks/blog-sign-up-thunk';

import classes from './create-edit-article-mw.module.scss';

const headerEdit = <h2 className={classes['article-header']}>Edit article</h2>;
const headerCreate = <h2 className={classes['article-header']}>Create new article</h2>;

const CreateEditArticle = () => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
    resetField,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
    // name: 'tags',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  });

  // console.log(fields);
  const { token } = useSelector((state) => state.loggedUserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  // console.log(slug);
  // console.log(useParams());
  const edit = slug;

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token]);

  useEffect(() => {
    append({ name: '' });
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
      <label className={classes['tags-title']}>Tags</label>
      <div className={classes['tag-wrapper-add-tag']}>
        <ul className={classes.tags}>
          {fields.map((item, idx) => {
            return (
              <li key={item.id} className={classes['tag-wrapper']}>
                <Controller
                  control={control}
                  name={`tags[tag${idx}]`}
                  render={({ field }) => (
                    <Input {...field} type="text" className={classes['tag-input']} placeholder={'Tag'}></Input>
                  )}
                  rules={{
                    validate: (match) => {
                      const tags = Object.values(getValues(`tags`));
                      // console.log(match);
                      console.log(idx);
                      let tagsCopy = [...tags];
                      const isTagInArray = tagsCopy.splice(idx, 1);
                      // console.log(isTagInArray.includes(match));
                      console.log(tagsCopy.includes(match));
                      console.log(tags);
                      console.log(isTagInArray);
                      return tagsCopy.includes(match) && 'Your tag is not unique';
                    },
                  }}
                />
                <Button
                  ghost
                  danger
                  type="primary"
                  className={classes['delete-button']}
                  onClick={() => {
                    resetField('tags');
                    remove(idx);
                  }}
                >
                  Delete
                </Button>
                {getValues(`tags`) && <div>{errors.tags[`tag${idx}`]?.message}</div>}
              </li>
            );
          })}
        </ul>
        <Button
          ghost
          type="primary"
          className={classes['add-button']}
          onClick={() => {
            append({ name: '' });
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
