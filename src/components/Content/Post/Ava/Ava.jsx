import { Avatar, Space } from 'antd';

import avatar from '../../../../assets/img/avatar.svg';

const Ava = ({ img }) => (
  <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size={64} src={img ? img : avatar} />
    </Space>
  </Space>
);
export default Ava;
