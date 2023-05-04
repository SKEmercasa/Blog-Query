import { useGetPostsQuery } from '../../store/posts';
import PaginationPost from '../PaginationPost/PaginationPost';
import Post from '../Post/Post';

import style from './articleContent.module.scss';

const ArticleContent = ({ verify, page, setPage }) => {
  const { data = [], isSuccess } = useGetPostsQuery(`${page}`);
  return (
    <div className={style.content}>
      <div className={style.main}>
        {isSuccess && data.articles.map((item, i) => <Post verify={verify} item={item} key={i} />)}
      </div>
      <div className={style.pagination}>
        <PaginationPost page={page} setPage={setPage} count={data.articlesCount} />
      </div>
    </div>
  );
};

export default ArticleContent;
