import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import { useEffect, useState } from 'react';

const Like = ({ favCount }) => {
  const [like, setLike] = useState(null);
  let [count, setCount] = useState(favCount);
  const [view, setView] = useState(false);
  const [auth, setAuth] = useState(null);

  const onLike = () => {
    setLike(!like);
    setView(true);
  };

  useEffect(() => {
    view && setCount(like ? count + 1 : count - 1);
  }, [like]);

  useEffect(() => {
    setAuth(false);
  }, []);

  return (
    <div>
      {!auth ? (
        <Space>
          <HeartFilled style={{ color: 'grey' }} />
        </Space>
      ) : (
        <Space>
          {like ? (
            <HeartFilled onClick={onLike} style={{ color: 'hotpink' }} />
          ) : (
            <HeartTwoTone twoToneColor="hotpink" onClick={onLike} />
          )}
        </Space>
      )}
      <span>{count}</span>
    </div>
  );
};

export default Like;
