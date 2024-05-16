import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from './types';
import DnsPagination from 'features/pagination';
import NewsNav from 'features/news-nav';
import style from './style.module.scss';
import NewsCard from 'entities/news-card';
import NewsStat from 'entities/news-stat';
import Layout from 'pages/layout';

const NewsListPage: FC = () => {
  const { data: news, isLoading } = useGetNewsQuery('');
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(Number(params.get('page')) || 1);
  const [filter, setFilter] = useState(params.get('type') || 'all');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setParams({ page: String(page), type: filter });
  }, [setParams, filter, page]);

  const handlePagination = (page: number) => {
    setPage(page);
    setDisplay(0);
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    setDisplay((prevDisplay) => prevDisplay + 1);
  };

  const handleFilter = (filtr: string) => {
    setFilter(filtr);
    setPage(1);
    setDisplay(0);
  };

  const sortingNews = (news: News[] | undefined): { totalNews: number; sortedNews: News[] } => {
    if (!news) {
      return { totalNews: 0, sortedNews: [] };
    }
    const result = news.filter((item) => filter === 'all' || item.type === filter);

    return {
      totalNews: result.length,
      sortedNews: result.slice((page - 1) * 9 - display * 9, page * 9),
    };
  };

  const { totalNews, sortedNews } = sortingNews(news);

  const articleList = sortedNews.map((item) => {
    return (
      <div key={self.crypto.randomUUID()} className={style['page__article']}>
        <NewsCard news={item} />
        <NewsStat stat={{ date: item.date, viewsCount: item.viewsCount, commentsCount: item.commentsCount }} />
      </div>
    );
  });

  if (isLoading) {
    return <div className={style['page--warning']}>Загружаем...</div>;
  }
  if (!articleList) {
    return <div className={style['page--warning']}>Ошибка, попробуйте чуть позже...</div>;
  }

  return (
    <Layout pageTitle='Новости'>
      <div className={style['page']}>
        <div className={style['page__content']}>
          <div className={style['page__nav']}>
            <NewsNav type={filter} handlerFilter={(filtr) => handleFilter(filtr)} />
          </div>
          <div className={style['page__articles']}>{articleList.length ? articleList : 'Таких новостей у нас нет'}</div>
        </div>
        <div className={style['page__pagination']}>
          <DnsPagination
            handleShowMore={() => handleShowMore()}
            handlePage={(page) => handlePagination(page)}
            page={page}
            total={totalNews}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewsListPage;
