import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import Like from './Like/Like';
import TagLink from './TagLink/TagLink';
import style from './post.module.scss';
import Ava from './Ava/Ava';
import Edit from './Edit/Edit';

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
        <TagLink tags={item.tagList} deg={textShot} />
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
            <Ava img={item.author.image} />
          </div>
        </main>
        {author === true && <Edit slug={item.slug} />}
      </div>
    </div>
  );
};

export default Post;
