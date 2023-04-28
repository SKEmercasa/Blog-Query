import { Button, message, Popconfirm } from 'antd';
import { Navigate } from 'react-router-dom';

import { useDeletePostMutation } from '../../../../redux/posts';

const DeletePost = ({ slug }) => {
  const [deletePost, { isSuccess }] = useDeletePostMutation();
  const confirm = (e) => {
    console.log(e);
    deletePost(slug);
    message.success('Post deleted');
  };
  const cancel = (e) => {
    console.log(e);
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
        <Button type="link">Delete</Button>
      </Popconfirm>
    </>
  );
};

export default DeletePost;
