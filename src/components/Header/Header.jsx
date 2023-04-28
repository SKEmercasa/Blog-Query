import { Link } from 'react-router-dom';

import style from './header.module.scss';
import User from './User/User';
import Enter from './Enter/Enter';

export const Header = ({ data, offData, offAuth, setPage }) => {
  function main() {
    setPage(1);
  }
  return (
    <header className={style.header}>
      <div className={style.main}>
        <Link to={'/'} onClick={main}>
          Realworld Blog
        </Link>
      </div>
      {data ? <User data={data} offData={offData} offAuth={offAuth} /> : <Enter />}
    </header>
  );
};
