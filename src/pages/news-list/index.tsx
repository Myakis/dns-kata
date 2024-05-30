import { FC, useEffect, useState } from 'react'; // Импортируем функциональный компонент, хук эффекта и хук состояния из React
import { useSearchParams } from 'react-router-dom'; // Импортируем хук для работы с параметрами URL

import { useGetNewsQuery } from 'shared/api/DNS'; // Импортируем кастомный хук для запроса новостей из API
import { News } from './types'; // Импортируем тип новостей
import DnsPagination from 'features/pagination'; // Импортируем компонент пагинации
import NewsNav from 'features/news-nav'; // Импортируем компонент навигации по новостям
import style from './style.module.scss'; // Импортируем стили
import NewsCard from 'entities/news-card'; // Импортируем компонент карточки новости
import NewsStat from 'entities/news-stat'; // Импортируем компонент статистики новости
import Layout from 'pages/layout'; // Импортируем компонент макета страницы

const NewsListPage: FC = () => {
  const { data: news, isLoading } = useGetNewsQuery(''); // Получаем данные новостей и статус загрузки из API
  const [params, setParams] = useSearchParams(); // Хук для работы с параметрами URL
  const [page, setPage] = useState(Number(params.get('page')) || 1); // Состояние текущей страницы, берём из URL или по умолчанию 1
  const [filter, setFilter] = useState(params.get('type') || 'all'); // Состояние текущего фильтра, берём из URL или по умолчанию 'all'
  const [display, setDisplay] = useState(0); // Состояние для управления количеством отображаемых новостей

  useEffect(() => {
    setParams({ page: String(page), type: filter }); // Обновляем параметры URL при изменении страницы или фильтра
  }, [setParams, filter, page]); // Эффект срабатывает при изменении filter или page

  const handlePagination = (page: number) => {
    setPage(page); // Устанавливаем текущую страницу
    setDisplay(0); // Сбрасываем отображаемое количество новостей
    document.body.scrollIntoView({ behavior: 'smooth' }); // Скроллим страницу вверх плавно
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Увеличиваем номер текущей страницы
    setDisplay((prevDisplay) => prevDisplay + 1); // Увеличиваем количество отображаемых новостей
  };

  const handleFilter = (filtr: string) => {
    setFilter(filtr); // Устанавливаем выбранный фильтр
    setPage(1); // Сбрасываем номер страницы на 1
    setDisplay(0); // Сбрасываем отображаемое количество новостей
  };

  const sortingNews = (news: News[] | undefined): { totalNews: number; sortedNews: News[] } => {
    if (!news) {
      return { totalNews: 0, sortedNews: [] }; // Если новостей нет, возвращаем пустой массив
    }
    const result = news.filter((item) => filter === 'all' || item.type === filter); // Фильтруем новости по выбранному фильтру

    return {
      totalNews: result.length, // Общее количество отфильтрованных новостей
      sortedNews: result.slice((page - 1) * 9 - display * 9, page * 9), // Разбиваем новости на страницы и учитываем количество отображаемых
    };
  };

  const { totalNews, sortedNews } = sortingNews(news); // Получаем общее количество новостей и отсортированный массив

  const articleList = sortedNews.map((item) => {
    return (
      <div key={self.crypto.randomUUID()} className={style['page__article']}>
        <NewsCard news={item} /> {/* Карточка новости */}
        <NewsStat stat={{ date: item.date, viewsCount: item.viewsCount, commentsCount: item.commentsCount }} />{' '}
        {/* Статистика новости */}
      </div>
    );
  });

  if (isLoading) {
    return <div className={style['page--warning']}>Загружаем...</div>; // Показать сообщение о загрузке
  }
  if (!articleList) {
    return <div className={style['page--warning']}>Ошибка, попробуйте чуть позже...</div>; // Показать сообщение об ошибке
  }

  return (
    <Layout pageTitle='Новости'>
      <div className={style['page']}>
        <div className={style['page__content']}>
          <div className={style['page__nav']}>
            <NewsNav type={filter} handlerFilter={(filtr) => handleFilter(filtr)} /> {/* Навигация по новостям */}
          </div>
          <div className={style['page__articles']}>{articleList.length ? articleList : 'Таких новостей у нас нет'}</div>{' '}
          {/* Список новостей */}
        </div>
        <div className={style['page__pagination']}>
          <DnsPagination
            handleShowMore={() => handleShowMore()} // Обработчик для кнопки "Показать больше"
            handlePage={(page) => handlePagination(page)} // Обработчик для перехода по страницам
            page={page} // Текущая страница
            pageSize={9} // Размер страницы (количество новостей на странице)
            total={totalNews} // Общее количество новостей
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewsListPage; // Экспорт компонента страницы новостей
