import { Link } from 'react-router-dom';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import style from './header.module.scss';

const Header = ({ data, offData, offAuth, setPage }) => {
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

const Enter = () => {
  return (
    <div className={style.enter}>
      <Link to={'sign-in'}>Sign In</Link>
      <Link to={'sign-up'} className={style.signUp}>
        Sign Up
      </Link>
    </div>
  );
};

const User = ({ data, offData, offAuth }) => {
  const logOut = () => {
    Cookies.remove('Token', { sameSite: 'strict' });
    offData(null);
    offAuth(false);
  };
  return (
    <div className={style.user}>
      <div>
        <Link to={'/new-article'} className={style.createArticle} style={{ fontSize: '14px' }}>
          Create article
        </Link>
      </div>
      <div>
        <Link to={'/profile'} style={{ fontSize: '18px' }}>
          {data.user.username && data.user.username}
        </Link>
        <Space direction="gorizontal" style={{ marginLeft: '10px' }}>
          <Avatar size={48} src={data.user.image && data.user.image} icon={!data.user.image && <UserOutlined />} />
        </Space>
      </div>
      <div>
        <Link style={{ marginRight: '20px', fontSize: '18px' }} className={style.logOut} onClick={logOut}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Header;
