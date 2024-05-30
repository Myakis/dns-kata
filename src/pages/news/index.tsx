import { FC } from 'react'; // Импортируем функциональный компонент из библиотеки React
import { useNavigate, useParams } from 'react-router-dom'; // Импортируем хуки для навигации и получения параметров из URL

import { useGetNewsQuery } from 'shared/api/DNS'; // Импортируем хук для получения новостей из API
import { News } from 'pages/news-list/types'; // Импортируем типы для новостей
import NewsBlock from 'widgets/news-block'; // Импортируем компонент для отображения блока новостей
import style from './style.module.scss'; // Импортируем стили для компонента
import Layout from 'pages/layout'; // Импортируем компонент макета страницы

const NewsPage: FC = () => {
  // Объявляем функциональный компонент NewsPage
  const { data: news, isLoading } = useGetNewsQuery(''); // Получаем данные новостей и состояние загрузки с помощью хука
  const navigate = useNavigate(); // Инициализируем хук для навигации
  const { id } = useParams(); // Получаем параметр id из URL

  const searchByIdNews = (news?: News[]): News | undefined => {
    // Функция для поиска новости по id
    if (!news) {
      // Если новости не загружены, возвращаем undefined
      return;
    }
    return news.find((item) => item.id === Number(id)); // Ищем новость с совпадающим id
  };

  const article = searchByIdNews(news); // Ищем новость по id

  if (isLoading) {
    // Если новости загружаются, отображаем сообщение
    return <div className={style['page--warning']}>Загружаем...</div>;
  }
  if (!article) {
    // Если новость не найдена, перенаправляем на страницу ошибки
    navigate('*');
    return;
  }

  const mockComment = () => {
    // Функция для отображения мока комментариев
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
    // Функция для отображения мока товаров
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
      {' '}
      {/* Оборачиваем страницу в макет с заголовком и хлебными крошками */}
      <div className={style['page']}>
        <div className={style['page__content']}>
          <section className={style['page__article']}>
            <NewsBlock article={article} /> {/* Отображаем найденную новость */}
          </section>
          <section className={style['page__comment']}>{mockComment()}</section> {/* Отображаем блок комментариев */}
          <section className={style['page__product']}>{mockProducts()}</section> {/* Отображаем блок товаров */}
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage; // Экспортируем компонент NewsPage по умолчанию
