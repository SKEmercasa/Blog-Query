import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Form, Input, message } from 'antd';

import { useUpdateUserMutation } from '../../store/posts';
import style from '../sign.module.scss';

const Profile = () => {
  const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();
  const navigate = useNavigate();
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
  useEffect(() => {
    if (isSuccess) {
      Cookies.set('Token', data.user.token, { sameSite: 'strict' });
      navigate('/', { state: { data } });
    }
  }, [isSuccess]);
  return (
    <div className={style.wrapper}>
      {contextHolder}
      <div className={style.forForm}>
        <h2>Edit Profile</h2>
        <ProfileLayout updateUser={updateUser} err={err} />
      </div>
    </div>
  );
};

const ProfileLayout = ({ updateUser, err }) => {
  const onFinish = (values) => {
    updateUser({
      user: {
        email: values.email,
        password: values.password,
        username: values.username,
        image: values.url,
      },
    });
  };
  const onFinishFailed = () => {
    err('data is not correct');
  };
  return (
    <Form
      layout="vertical"
      name="basic"
      size="middle"
      style={{
        maxWidth: 400,
        maxHeight: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        wrapperCol={{
          span: 0,
          offset: 0,
        }}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email address"
        name="email"
        wrapperCol={{
          offset: 0,
        }}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="password"
        wrapperCol={{
          offset: 0,
        }}
        rules={[
          {
            required: true,
            max: 30,
            min: 8,
            message: 'Please input your password!',
          },
          {
            max: 40,
            min: 6,
            message: 'Please input 6+ or 40- letters!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="url"
        label="Avatar image (url)"
        rules={[
          {
            type: 'url',
            required: true,
            message: 'URL avatar incorrect!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 120,
          offset: 0,
        }}
        style={{ marginBottom: '0' }}
      >
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '0' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
