import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Avatar, Space, Tag } from 'antd';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';

import { useFavoritePostMutation, useUnfavoritePostMutation } from '../../store/posts';
import DeletePost from '../DeletePost/DeletePost';
import avatar from '../../assets/img/avatarDefault.svg';

import style from './post.module.scss';

const Post = ({ item, verify, auth }) => {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    if (item?.author?.username === auth?.user?.username) {
      setAuthor(verify);
    }
    if (verify == false) {
      setAuthor(verify);
    }
  }, [auth]);

  function textShot(el = '', limit) {
    let overText = `${el.slice(0, el.indexOf(' ', limit))}`;
    return el.length <= limit ? el : overText;
  }

  return (
    <div className={style.post}>
      <div className={style.info}>
        <header>
          <Link to={`/articles/${item.slug && item.slug}`} className={style.title}>
            {textShot(item.title, 30)}
          </Link>
          <Like favCount={item.favoritesCount} verify={verify} like={item.favorited} slug={item.slug} />
        </header>
        <TagLink tags={item.tagList} textShot={textShot} />
        <section>
          <span>{textShot(item.description, 200)}</span>
        </section>
      </div>
      <div className={style.author}>
        <main>
          <div>
            <span>{item?.author?.username}</span>
            <span className={style.time}>{item.createdAt && format(new Date(item.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <div>
            <AvatarLayout img={item.author.image} />
          </div>
        </main>
        {author === true && <Edit slug={item.slug} />}
      </div>
    </div>
  );
};

const AvatarLayout = ({ img }) => (
  <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size={64} src={img ? img : avatar} />
    </Space>
  </Space>
);

const Edit = ({ slug }) => {
  return (
    <section className={style.edit}>
      <DeletePost slug={slug} />
      <Link
        style={{
          padding: '14px',
          border: '1px solid #52C41A',
          borderRadius: '4px',
          color: '#52C41A',
          lineHeight: '1px',
        }}
        to={`/articles/${slug}/edit`}
      >
        Edit
      </Link>
    </section>
  );
};

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

const TagLink = ({ tags, textShot }) => {
  if (tags) {
    const list = tags.map((tag, i) => <Elem tag={tag} textShot={textShot} key={i} />);
    return list;
  }
};

const Elem = ({ tag, textShot }) => (
  <Space size={[0, 8]} wrap>
    <Tag>{textShot(tag, 20)}</Tag>
  </Space>
);

export default Post;
