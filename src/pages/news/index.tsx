import NewsBlock from 'widgets/news-block';
import CommentBlock from 'widgets/comment';
import NewsProductsList from 'widgets/news-products';

import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useGetNewsQuery } from 'shared/api/newsApi';
import { NewsSlice } from 'shared/store/slices/news-slice';
import type { News } from 'shared/store/slices/news-slice/types';

const NewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetNewsQuery('');
  const { page, type, display, loadNews, newsData } = useAppSelector((state) => state.news);
  const param = useParams();
  const { getNews, findNewsId } = NewsSlice.actions;

  useEffect(() => {
    if (!loadNews) {
      dispatch(getNews(data!));
      // console.log('fetch');
    }
  }, [dispatch, data, getNews, loadNews]);

  useEffect(() => {
    if (loadNews) {
      const test = newsData.filter((item) => item.id === Number(param.id));

      dispatch(findNewsId(test[0]));
    }
  }, [dispatch, page, type, display, newsData, loadNews, param.id]);

  // useEffect(() => {
  //   if (loadNews) {
  //     // dispatch(findNewsId(Number(param.id)));
  //   }
  // }, [dispatch, page, type, display, newsData, loadNews, findNewsId, param.id]);

  // console.log(articleNews);

  return (
    <div className={style['news']}>
      <div className={style['news__path']}>типо хлебные крошки</div>
      <h1 className={style['news--title']}>{}</h1>
      <div className={style['news__content']}>
        <section className={style['news__article']}>
          <NewsBlock />
        </section>
        <section className={style['news__comment']}>
          <CommentBlock />
        </section>
        <section className={style['news__product']}>
          <NewsProductsList />
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
