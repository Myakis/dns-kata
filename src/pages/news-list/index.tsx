import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useGetNewsQuery } from 'shared/api/newsApi';
import { NewsSlice } from 'shared/store/slices/news-slice';
import NewsList from 'widgets/news-list';
import DnsPagination from 'features/pagination';
import { sortingNews } from 'shared/store/slices/news-slice';
import style from './style.module.scss';

const NewsListPage: FC = () => {
  const { page, type, display, loadNews, newsData } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const { data } = useGetNewsQuery('');
  const { getNews, showMore, changePage } = NewsSlice.actions;

  useEffect(() => {
    if (!loadNews) {
      dispatch(getNews(data!));
    }
  }, [dispatch, data, getNews, loadNews]);

  useEffect(() => {
    if (loadNews) {
      dispatch(sortingNews(''));
    }
  }, [dispatch, page, type, display, newsData, loadNews]);

  const eventMoreClick = () => {
    dispatch(showMore());
  };

  const eventChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  return (
    <>
      <div className={style['page']}>
        <h1 className={style['page--title']}>Новости</h1>
        <div className={style['page__articles']}>
          <NewsList />
        </div>
        <div className={style['page__pagination']}>
          <DnsPagination buttonEvent={eventMoreClick} paginationEvent={eventChangePage} page={page} />
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
