import { Form, Button, Input } from 'antd';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const { TextArea } = Input;

import { editArticle } from '../store/thunks/edit-article-thunk';

import classes from './edit-article-mw.module.scss';

const EditArticle = () => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tags: [
        {
          name: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const dispatch = useDispatch();
  const { slug } = useParams();

  const { token } = useSelector((state) => state.loggedUserReducer);
  const { title, description, body, tagList } = useSelector((state) => state.currentArticleReducer);
  console.log(title, description, body, tagList[0]);
  // console.log(tagList[0]);

  const onSubmit = (data) => {
    dispatch(editArticle(slug, data, token));
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={classes['edit-new-article-mw']}>
      <h2 className={classes['article-header']}>Edit article</h2>
      <label className={classes['title-label']}>Title</label>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            className={classes['title-input']}
            placeholder={'Title'}
            defaultValue={title}
          ></Input>
        )}
        rules={{
          required: true,
        }}
      />
      <label className={classes['short-description-label']}>Short description</label>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            className={classes['short-description-input']}
            placeholder={'Short description'}
            defaultValue={description}
          ></Input>
        )}
        rules={{
          required: true,
        }}
      />
      <label className={classes['text-label']}>Text</label>
      <Controller
        control={control}
        name="body"
        render={({ field }) => (
          <TextArea
            {...field}
            rows={7}
            type="text"
            className={classes['textarea-input']}
            placeholder={'Text'}
            defaultValue={body}
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
            console.log(tagList);
            return (
              <li key={item.id} className={classes['tag-wrapper']}>
                <Controller
                  control={control}
                  name={`tags[${idx}].name`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={classes['tag-input']}
                      placeholder={'Tag'}
                      defaultValue={item}
                    ></Input>
                  )}
                  rules={{
                    validate: (match) => {
                      const tags = getValues(`tags`);
                      const tagsArray = tags.map((tag) => tag.name);
                      const tagsArrayCopy = [...tagsArray];
                      tagsArrayCopy.splice(idx, 1);
                      const isDuoble = tagsArrayCopy.includes(match);
                      return !isDuoble || 'Your tag is not unique';
                    },
                  }}
                />
                <Button
                  ghost
                  danger
                  type="primary"
                  className={classes['delete-button']}
                  onClick={() => {
                    remove(idx);
                  }}
                >
                  Delete
                </Button>
                {getValues(`tags`) && errors.tags && (
                  <div className={classes['not-unique-tag']}>{errors.tags[idx]?.name.message}</div>
                )}
              </li>
              // <li key={item.id} className={classes['tag-wrapper']}>
              //   <Controller
              //     control={control}
              //     name={`tags[${idx}].name`}
              //     render={({ field }) => (
              //       <Input
              //         {...field}
              //         type="text"
              //         className={classes['tag-input']}
              //         placeholder={'Tag'}
              //         defaultValue={item}
              //       ></Input>
              //     )}
              //     rules={{
              //       validate: (match) => {
              //         const tags = getValues(`tags`);
              //         const tagsArray = tags.map((tag) => tag.name);
              //         const tagsArrayCopy = [...tagsArray];
              //         tagsArrayCopy.splice(idx, 1);
              //         const isDuoble = tagsArrayCopy.includes(match);
              //         return !isDuoble || 'Your tag is not unique';
              //       },
              //     }}
              //   />
              //   <Button
              //     ghost
              //     danger
              //     type="primary"
              //     className={classes['delete-button']}
              //     onClick={() => {
              //       remove(idx);
              //     }}
              //   >
              //     Delete
              //   </Button>
              //   {getValues(`tags`) && errors.tags && (
              //     <div className={classes['not-unique-tag']}>{errors.tags[idx]?.name.message}</div>
              //   )}
              // </li>
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

export default EditArticle;
