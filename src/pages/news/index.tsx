import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from 'pages/news-list/types';
import NewsBlock from 'widgets/news-block';
import style from './style.module.scss';
import Layout from 'pages/layout';

const NewsPage: FC = () => {
  const { data: news, isLoading } = useGetNewsQuery('');
  const navigate = useNavigate();
  const { id } = useParams();

  const searchByIdNews = (news?: News[]): News | undefined => {
    if (!news) {
      return;
    }
    return news.find((item) => item.id === Number(id));
  };

  const article = searchByIdNews(news);

  if (isLoading) {
    return <div className={style['page--warning']}>Загружаем...</div>;
  }
  if (!article) {
    navigate('*');
    return;
  }

  const mockComment = () => {
    return (
      <>
        <h2 className={style['comment--title']}>Комментарии</h2>
        <div className={style['comment__body']}>
          <textarea className={style['comment--input']} placeholder='Написать комментарий...' />
          <button className={style['comment--button']}>Отправить</button>
        </div>
      </>
    );
  };

  const mockProducts = () => {
    return (
      <>
        <div className={style['product__header']}>
          <p className={style['product--title']}>Товары</p>
          <a className={style['product__link']} href='/'>
            <p>
              Смотреть все<i></i>
            </p>
          </a>
        </div>
        <div className={style['product__list']}></div>
      </>
    );
  };

  return (
    <Layout pageTitle={article.name || null} breadcrumbs='Главная'>
      <div className={style['page']}>
        <div className={style['page__content']}>
          <section className={style['page__article']}>
            <NewsBlock article={article} />
          </section>
          <section className={style['page__comment']}>{mockComment()}</section>
          <section className={style['page__product']}>{mockProducts()}</section>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
