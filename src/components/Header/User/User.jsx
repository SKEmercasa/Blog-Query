import { Link } from 'react-router-dom';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import style from './user.module.scss';

const User = ({ data, offData, offAuth }) => {
  const logOut = () => {
    Cookies.remove('Token', { sameSite: 'strict' });
    offData(null);
    offAuth(false);
  };
  return (
    <div className={style.user}>
      <div>
        <Link to={'/new-article'} style={{ fontSize: '14px' }}>
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
        <Link style={{ marginRight: '20px', fontSize: '18px' }} onClick={logOut}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default User;
