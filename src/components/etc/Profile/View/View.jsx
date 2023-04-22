import { Button, Form, Input } from 'antd';

const View = ({ updateUser }) => {
  const onFinish = (values) => {
    updateUser({
      user: {
        email: values.email,
        password: values.password,
        username: values.username,
        image: values.url,
      },
    });
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

export default View;
