import { Navigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

import { useAddPostMutation } from '../../store/posts';

import style from './createPost.module.scss';

const CreatePost = () => {
  const [addPost, { isSuccess, error }] = useAddPostMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const err = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };
  useEffect(() => {
    if (error) {
      err(Object.values(error.data.errors));
    }
  }, [error]);

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className={style.wrapper}>
      {contextHolder}
      <div className={style.forForm}>
        <h2>Create new article</h2>
        <CreatePostLayout addPost={addPost} err={err} />
      </div>
    </div>
  );
};

const CreatePostLayout = ({ addPost, err }) => {
  const onFinish = (values) => {
    addPost({
      article: {
        title: values.title,
        description: values.description,
        body: values.text,
        tagList: values.list,
      },
    });
  };
  const onFinishFailed = () => {
    err('data is not correct');
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      layout={'vertical'}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        width: 800,
      }}
      autoComplete="off"
    >
      <Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Missing title',
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Short description"
          rules={[
            {
              required: true,
              message: 'Missing Short description',
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="text"
          label="Text"
          rules={[
            {
              required: true,
              message: 'Missing text',
            },
          ]}
        >
          <TextArea rows={4} placeholder="Text" />
        </Form.Item>
        <Form.List name="list">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item label={index === 0 ? 'Tags' : ''} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, message: 'Missing tag' }]}
                    noStyle
                  >
                    <Input
                      placeholder="Tag"
                      style={{
                        width: '30%',
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      type="default"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      style={{
                        width: '10%',
                        marginLeft: '20px',
                        padding: '10px',
                        border: '1px solid #F5222D',
                        color: '#F5222D',
                        lineHeight: '1px',
                      }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="default"
                  onClick={() => add()}
                  style={{
                    width: '10%',
                    padding: '10px',
                    border: '1px solid #1890FF',
                    color: '#1890FF',
                    lineHeight: '1px',
                  }}
                >
                  Add tag
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '35%',
            }}
          >
            Send
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;
