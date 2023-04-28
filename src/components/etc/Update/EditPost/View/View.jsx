import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const View = ({ item, update, slug }) => {
  const onFinish = (values) => {
    update({
      body: {
        article: {
          title: values.title,
          description: values.description,
          body: values.text,
        },
      },
      slug,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          initialValue={item.article.title}
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
          initialValue={item.article.description}
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
          initialValue={item.article.body}
          rules={[
            {
              required: true,
              message: 'Missing text',
            },
          ]}
        >
          <TextArea rows={4} placeholder="Text" />
        </Form.Item>
        <Form.List name="list" initialValue={item.article.tagList}>
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
                  {fields.length > 0 ? (
                    <Button
                      type="default"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      style={{
                        width: '10%',
                        marginLeft: '20px',
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
export default View;
