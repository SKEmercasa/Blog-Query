import View from './View/View';
import style from './createPost.module.scss';

const CreatePost = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.forForm}>
        <h2>Create new account</h2>
        <View />
      </div>
    </div>
  );
};

export default CreatePost;
