import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { Space } from 'antd';

import { useFavoritePostMutation, useUnfavoritePostMutation } from '../../../../redux/posts';

const Like = ({ favCount, verify, slug, like }) => {
  function pushLike() {
    isLikes(slug);
  }
  function pushUnlike() {
    isUnlikes(slug);
  }

  const [isLikes] = useFavoritePostMutation();
  const [isUnlikes] = useUnfavoritePostMutation();

  return (
    <div>
      {!verify ? (
        <Space>
          <HeartFilled style={{ color: 'grey' }} />
        </Space>
      ) : (
        <Space>
          {like ? (
            <HeartFilled style={{ color: 'hotpink' }} onClick={pushUnlike} />
          ) : (
            <HeartTwoTone twoToneColor="hotpink" onClick={pushLike} />
          )}
        </Space>
      )}
      <span>{favCount}</span>
    </div>
  );
};

export default Like;
