import { Button, Checkbox, Form, Input } from 'antd';

const View = ({ add }) => {
  const onFinish = async (values) => {
    console.log(values);
    await add({
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    }).unwrap();
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

export default View;
