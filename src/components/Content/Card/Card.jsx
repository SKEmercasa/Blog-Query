import Markdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

import Post from '../Post/Post';
import { useGetPostQuery } from '../../../redux/posts';

import style from './card.module.scss';

const Card = () => {
  const location = useLocation();
  const { data, isSuccess } = useGetPostQuery(location.pathname.split('/').pop());
  return (
    <div className={style.wrapper}>
      {isSuccess && <Post item={data.article} />}
      <article className={style.post}>{isSuccess && <Markdown>{data?.article?.body}</Markdown>}</article>
    </div>
  );
};

export default Card;
