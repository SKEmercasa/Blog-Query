import { useState } from 'react';

import { useGetPostsQuery } from '../../redux/posts';

import Pagin from './Pagin/Pagin';
import Post from './Post/Post';
import style from './content.module.scss';

const Content = () => {
  const [page, setPage] = useState(1);

  const { data = [], isSuccess } = useGetPostsQuery(page);

  return (
    <div className={style.content}>
      <div className={style.main}>{isSuccess && data.articles.map((item, i) => <Post item={item} key={i} />)}</div>
      <div className={style.pagination}>
        <Pagin page={page} setPage={setPage} count={data.articlesCount} />
      </div>
    </div>
  );
};

export default Content;
