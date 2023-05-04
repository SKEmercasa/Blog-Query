import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Form, Input, message } from 'antd';

import style from '../sign.module.scss';
import { useLoginUserMutation } from '../../store/posts';

const Authorization = () => {
  const [loginUser, { data, isSuccess, error }] = useLoginUserMutation();
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
        <h2>Sign In</h2>
        <AuthorizationLayout login={loginUser} err={err} />
        <span className={style.other}>
          Don&#8217;t have an account? <Link to={'/sign-up'}>Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};

const AuthorizationLayout = ({ login, err }) => {
  const onFinish = async (values) => {
    await login({
      user: {
        email: values.email,
        password: values.password,
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
        label="Email"
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
        label="Password"
        name="password"
        wrapperCol={{
          offset: 0,
        }}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 120,
          offset: 0,
        }}
        style={{ marginBottom: '0' }}
      >
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '0' }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Authorization;
