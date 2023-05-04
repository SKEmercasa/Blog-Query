import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Checkbox, Form, Input, message } from 'antd';

import style from '../sign.module.scss';
import { useAddUserMutation } from '../../store/posts';

const Registration = () => {
  const [addUser, { data, isSuccess, error }] = useAddUserMutation();
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
  const navigate = useNavigate();
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
        <h2>Create new account</h2>
        <RegistrationLayout add={addUser} err={err} />
        <span className={style.other}>
          Already have an account? <Link to={'/sign-in'}>Sign In</Link>.
        </span>
      </div>
    </div>
  );
};

const RegistrationLayout = ({ add, err }) => {
  const onFinish = async (values) => {
    await add({
      user: {
        username: values.username,
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        wrapperCol={{
          sm: { span: 0, offset: 0 },
        }}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          {
            min: 3,
            max: 20,
            message: 'Please input 3+ or 20- letters!',
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
        label="Repeat Password"
        name="repeat password"
        dependencies={['password']}
        hasFeedback
        wrapperCol={{
          offset: 0,
        }}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agree"
        valuePropName="checked"
        wrapperCol={{
          offset: 0,
          span: 20,
        }}
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
          },
        ]}
      >
        <Checkbox>I agree to the processing of my personal information</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 120,
          offset: 0,
        }}
        style={{ marginBottom: '0' }}
      >
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '0' }}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
