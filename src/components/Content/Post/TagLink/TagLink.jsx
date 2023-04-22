import { Space, Tag } from 'antd';

const TagLink = ({ tags, deg }) => {
  if (tags) {
    const list = tags.map((tag, i) => <Elem tag={tag} deg={deg} key={i} />);
    return list;
  }
};

const Elem = ({ tag, deg }) => (
  <Space size={[0, 8]} wrap>
    <Tag>{deg(tag, 20)}</Tag>
  </Space>
);
export default TagLink;
