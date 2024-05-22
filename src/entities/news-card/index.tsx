import { FC } from 'react';
// Импортируем FC (Functional Component) из библиотеки React.

import { Link } from 'react-router-dom';
// Импортируем компонент Link из библиотеки react-router-dom для создания ссылок.

import { News } from 'pages/news-list/types';
// Импортируем тип News из файла types, находящегося в директории pages/news-list.

import randomBanner from './constants/articles-banners';
// Импортируем функцию randomBanner из файла constants/articles-banners в текущей директории.

import style from './style.module.scss';
// Импортируем стили из файла style.module.scss.

const NewsCard: FC<{ news: News }> = ({ news }) => {
  // Создаем функциональный компонент NewsCard, который принимает пропс news типа News.

  const renderTagColor = (tag: string): string => {
    // Определяем функцию renderTagColor, которая принимает строку tag и возвращает строку.

    const colorsBase: { [key in string]: string } = {
      // Определяем объект colorsBase, который связывает теги с классами стилей.

      new: style['tag--new'],
      commonInfo: style['tag--commonInfo'],
      exclusives: style['tag--exclusives'],
      services: style['tag--services'],
      shops: style['tag--shops'],
      advertising: style['tag--advertising'],
    };

    return colorsBase[tag];
    // Возвращаем соответствующий класс для заданного тега.
  };

  const shortingText: (prevText: string, limit: number) => string = (prevText, limit) => {
    // Определяем функцию shortingText, которая принимает строку prevText и число limit, и возвращает строку.

    const arrd = prevText.split('');
    // Разбиваем строку prevText на массив символов.

    const newText = arrd.slice(0, arrd.indexOf(' ', limit));
    // Создаем новый текст, беря часть массива символов до первого пробела после заданного лимита.

    return `${newText.join('')}...`;
    // Объединяем массив символов в строку и добавляем троеточие.
  };

  const handlerLinkScroll = () => {
    // Определяем функцию handlerLinkScroll для прокрутки страницы вверх.

    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Используем метод window.scrollTo для плавной прокрутки страницы вверх.
  };

  return (
    <article className={style['card']}>
      {/* Возвращаем JSX для компонента NewsCard. */}
      <div className={style['card__banner']}>
        {/* Создаем div для баннера карточки с классом card__banner. */}
        <Link to={`${news.id}`} onClick={() => handlerLinkScroll()}>
          {/* // Создаем ссылку на страницу новости с обработчиком клика для прокрутки страницы вверх. */}
          <img src={randomBanner(true)} alt='banner' />
          {/* // Вставляем изображение баннера, полученное с помощью функции randomBanner. */}
        </Link>
      </div>
      <div className={style['card__title']}>
        {/* // Создаем div для заголовка карточки с классом card__title. */}
        <Link to={`${news.id}`} onClick={() => handlerLinkScroll()}>
          {/* // Создаем ссылку на страницу новости с обработчиком клика для прокрутки страницы вверх. */}
          {news.name}
          {/* // Вставляем название новости. */}
        </Link>
      </div>
      <div className={style['card__discription']}>
        {/* // Создаем div для описания карточки с классом card__discription. */}
        <p>{shortingText(news.description, 200)}</p>
        {/* // Вставляем сокращённое описание новости, обрезанное до 200 символов. */}
      </div>
      <div className={style['card__tags']}>
        {/* // Создаем div для тегов карточки с классом card__tags. */}
        <div className={`${style['card__tag']} ${renderTagColor(news.type)}`}>
          {/* // Создаем div для одного тега с классами card__tag и классом, соответствующим типу новости. */}
          <p>{news.type}</p>
          {/* // Вставляем тип новости. */}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
// Экспортируем компонент NewsCard по умолчанию.
