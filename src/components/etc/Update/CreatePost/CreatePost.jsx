import { Navigate } from 'react-router-dom';

import { useAddPostMutation } from '../../../../redux/posts';

import View from './View/View';
import style from './createPost.module.scss';

const CreatePost = () => {
  const [addPost, { isSuccess }] = useAddPostMutation();

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style.forForm}>
        <h2>Create new article</h2>
        <View addPost={addPost} />
      </div>
    </div>
  );
};

export default CreatePost;
