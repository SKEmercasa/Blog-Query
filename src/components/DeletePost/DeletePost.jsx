import { Button, message, Popconfirm } from 'antd';
import { Navigate } from 'react-router-dom';

import { useDeletePostMutation } from '../../store/posts';

const DeletePost = ({ slug }) => {
  const [deletePost, { isSuccess }] = useDeletePostMutation();
  const confirm = () => {
    deletePost(slug);
    message.success('Post deleted');
  };
  const cancel = () => {
    message.error('The operation was used by the user');
  };

  return (
    <>
      {isSuccess && <Navigate to="/" replace={true} />}
      <Popconfirm
        title="Delete the article"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        placement={'right'}
      >
        <Button
          style={{
            padding: '10px',
            border: '1px solid #F5222D',
            color: '#F5222D',
            lineHeight: '1px',
          }}
          type="link"
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeletePost;
