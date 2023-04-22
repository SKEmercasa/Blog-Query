import { Link } from 'react-router-dom';

import style from './header.module.scss';
import User from './User/User';
import Enter from './Enter/Enter';

export const Header = ({ auth, off }) => {
  return (
    <header className={style.header}>
      <div className={style.main}>
        <Link to={'/'}>Realworld Blog</Link>
      </div>
      {auth ? <User data={auth} off={off} /> : <Enter />}
    </header>
  );
};
