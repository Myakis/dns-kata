import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useGetNewsQuery } from 'shared/api/newsApi';
import { NewsSlice } from 'shared/store/slices/news-slice';
import NewsList from 'widgets/news-list';
import DnsPagination from 'features/pagination';
import style from './style.module.scss';
import { sortingNews } from 'shared/store/slices/news-slice';

const NewsListPage: FC = () => {
  const { page, type, display } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const { data } = useGetNewsQuery('');
  const { getNews } = NewsSlice.actions;

  useEffect(() => {
    dispatch(getNews(data!));
  }, [dispatch, data, getNews]);

  useEffect(() => {
    dispatch(sortingNews(''));
  }, [dispatch, page, type, display]);

  return (
    <div className={style['NewsListPage']}>
      <h1 className={style['NewsListPage--title']}>Новости</h1>
      <div className={style['NewsListPage__articles']}>
        <NewsList />
      </div>
      <div className={style['NewsListPage__pagination']}>
        <DnsPagination />
      </div>
    </div>
  );
};

export default NewsListPage;
