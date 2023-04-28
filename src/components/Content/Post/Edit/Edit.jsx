import { Link } from 'react-router-dom';

import DeletePost from '../../../etc/Update/DeletePost/DeletePost';

import style from './edit.module.scss';

const Edit = ({ slug }) => {
  return (
    <section className={style.edit}>
      <DeletePost slug={slug} />
      <Link to={`/articles/${slug}/edit`}>Edit</Link>
    </section>
  );
};

export default Edit;
