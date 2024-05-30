import { FC } from 'react'; // Импортируем функциональный компонент из библиотеки React

import randomBanner from 'entities/news-card/constants/articles-banners'; // Импортируем функцию для получения случайного баннера
import type { News } from 'pages/news-list/types'; // Импортируем типы для новостей
import NewsStat from 'entities/news-stat'; // Импортируем компонент для отображения статистики новостей
import NewsShare from 'features/share-tooltip'; // Импортируем компонент для отображения тултипа для шаринга
import style from './style.module.scss'; // Импортируем стили для компонента

const NewsBlock: FC<{ article: News }> = ({ article: { name, description, date, viewsCount } }) => {
  // Объявляем функциональный компонент NewsBlock, принимающий новость в качестве пропса
  function addIndentText(text: string) {
    // Функция для добавления отступов в тексте
    return text.split('\n').join('\n\n'); // Разделяем текст по символу новой строки и добавляем дополнительный отступ
  }

  return (
    <article className={style['news']}>
      {' '}
      {/* Основной блок статьи */}
      <div className={style['news__container']}>
        {' '}
        {/* Контейнер для содержимого статьи */}
        <img className={style['news--img']} src={`${randomBanner()}`} alt='banner' /> {/* Изображение баннера */}
        <div className={style['news__title']}>
          {' '}
          {/* Заголовок статьи */}
          <p>
            <b>{name}</b> {/* Название статьи */}
          </p>
          <div className={style['news__description']}>{addIndentText(description)}</div>{' '}
          {/* Описание статьи с отступами */}
          <div className={style['news__stat']}>
            {' '}
            {/* Блок статистики статьи */}
            <NewsStat stat={{ date: date, viewsCount: viewsCount }} />{' '}
            {/* Компонент для отображения даты и количества просмотров */}
            <NewsShare /> {/* Компонент для шаринга статьи */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsBlock; // Экспортируем компонент NewsBlock по умолчанию
