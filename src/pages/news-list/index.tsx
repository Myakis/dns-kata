import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useGetNewsQuery } from 'shared/api/newsApi';
import { NewsSlice } from 'shared/store/slices/news-slice';
import NewsList from 'widgets/news-list';
import DnsPagination from 'features/pagination';
import style from './style.module.scss';
import { sortingNews } from 'shared/store/slices/news-slice';
import Footer from 'widgets/footer';

const NewsListPage: FC = () => {
  const { page, type, display, loadNews, newsData } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const { data } = useGetNewsQuery('');
  const { getNews, showMore, changePage } = NewsSlice.actions;

  useEffect(() => {
    if (!loadNews) {
      dispatch(getNews(data!));
      // console.log('fetch');
    }
  }, [dispatch, data, getNews, loadNews]);

  useEffect(() => {
    if (loadNews) {
      dispatch(sortingNews(''));
      // console.log('sorting');
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
      <div className={style['mock-header']}>тест</div> {/* test */}
      <div className={style['page']}>
        <h1 className={style['page--title']}>Новости</h1>
        <div className={style['page__articles']}>
          <NewsList />
        </div>
        <div className={style['page__pagination']}>
          <DnsPagination button={eventMoreClick} pagination={eventChangePage} />
        </div>
      </div>
      <Footer /> {/* test */}
    </>
  );
};

export default NewsListPage;
