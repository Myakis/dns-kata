import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from 'pages/news-list/types';
import NewsBlock from 'widgets/news-block';
import CommentBlock from 'widgets/comment';
import NewsProductsList from 'widgets/news-products';

import style from './style.module.scss';

const NewsPage: FC = () => {
  const { data, isLoading } = useGetNewsQuery('');
  const navigate = useNavigate();
  const { id } = useParams();

  if (isLoading) {
    return <div className={style['page__isLoading']}>Loading...</div>;
  } else if (!data) {
    return <div className={style['page__isLoading']}>Error, please try again later...</div>;
  }

  const findIdNews = (data: News[]): News | undefined => {
    const res = data.find((item) => item.id === Number(id));

    return res;
  };

  const article = findIdNews(data);

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
          <CommentBlock />
        </section>
        <section className={style['page__product']}>
          <NewsProductsList />
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
