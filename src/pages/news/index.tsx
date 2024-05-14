import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from 'pages/news-list/types';
import NewsBlock from 'widgets/news-block';
import style from './style.module.scss';

const NewsPage: FC = () => {
  const { data: news, isLoading } = useGetNewsQuery('');
  const navigate = useNavigate();
  const { id } = useParams();

  const findIdNews = (news: News[] | undefined): News | undefined => {
    if (!news) {
      return;
    }
    return news.find((item) => item.id === Number(id));
  };

  const article = findIdNews(news);

  if (isLoading) {
    return <div className={style['page--warning']}>Загружаем...</div>;
  }
  if (!article) {
    navigate('*');
    return;
  }

  return (
    <div className={style['page']}>
      <div className={style['page__path']}>типо хлебные крошки</div>
      <h1 className={style['page--title']}>{article.name}</h1>
      <div className={style['page__content']}>
        <section className={style['page__article']}>
          <NewsBlock article={article} />
        </section>
        <section className={style['page__comment']}>
          <h2 className={style['comment--title']}>Комментарии</h2>
          <div className={style['comment__body']}>
            <textarea className={style['comment--input']} placeholder='Написать комментарий...' />
            <button className={style['comment--button']}>Отправить</button>
          </div>
        </section>
        <section className={style['page__product']}>
          <div className={style['product__header']}>
            <p className={style['product--title']}>Товары</p>
            <a className={style['product__link']} href='https://www.dns-shop.ru/#' target='__blank'>
              <p>
                Смотреть все<i></i>
              </p>
            </a>
          </div>
          <div className={style['product__list']}></div>
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
