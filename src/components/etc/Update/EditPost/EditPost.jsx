import { Navigate, useLocation } from 'react-router-dom';

import { useGetPostQuery, useUpdatePostMutation } from '../../../../redux/posts';

import View from './View/View';
import style from './editPost.module.scss';

const EditPost = () => {
  const location = useLocation();
  let slug = location.pathname.split('/');
  const getPost = useGetPostQuery(slug[2]);
  const [updatePost, { isSuccess }] = useUpdatePostMutation();

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.forForm}>
        <h2>Edit article</h2>
        {getPost.isSuccess && <View item={getPost.data} update={updatePost} slug={slug[2]} />}
      </div>
    </div>
  );
};

export default EditPost;
