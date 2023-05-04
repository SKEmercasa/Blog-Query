import { Pagination } from 'antd';

const PaginationPost = ({ count, page, setPage }) => {
  return (
    <Pagination
      current={page}
      onChange={(e) => {
        setPage(e);
      }}
      total={count}
      showSizeChanger={false}
      pageSize={5}
    />
  );
};
export default PaginationPost;
