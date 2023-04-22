import { Link } from 'react-router-dom';

import style from './edit.module.scss';

const Edit = () => {
  return (
    <section className={style.edit}>
      <Link>Delete</Link>
      <Link>Edit</Link>
    </section>
  );
};

export default Edit;
