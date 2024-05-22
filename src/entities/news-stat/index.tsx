import { FC } from 'react';
// Импортируем FC (Functional Component) из библиотеки React.

import clsx from 'clsx';
// Импортируем библиотеку clsx, которая используется для условного присвоения классов.

import style from './style.module.scss';
// Импортируем стили из файла style.module.scss.

interface INewsStat {
  stat: {
    date: string;
    viewsCount: number;
    commentsCount?: number | null;
  };
}
// Определяем интерфейс INewsStat с объектом stat, который содержит дату (date), количество просмотров (viewsCount) и необязательное количество комментариев (commentsCount).

const NewsStat: FC<INewsStat> = ({ stat }) => {
  // Создаем функциональный компонент NewsStat, который принимает пропс stat типа INewsStat.

  const formatDate = (date: string): string => {
    // Определяем функцию formatDate, которая принимает строку date и возвращает строку.

    const newDate: Date = new Date(date);
    // Создаем новый объект Date из строки date.

    const dateArr: number[] = [newDate.getDate(), newDate.getMonth() + 1];
    // Создаем массив dateArr, содержащий день и месяц (увеличенный на 1, так как месяцы в объекте Date начинаются с 0).

    return `${dateArr.map((item) => (item < 10 ? `0${item}` : item)).join('.')}.${newDate.getFullYear()}`;
    // Возвращаем строку в формате "дд.мм.гггг", добавляя ведущий ноль для дней и месяцев меньше 10.
  };

  return (
    <>
      {/* // Возвращаем JSX для компонента NewsStat. */}
      <div className={clsx(style.stat, !stat.commentsCount ? style.offBorder : null)}>
        {/* // Создаем div с классами stat и offBorder (если нет комментариев) с помощью clsx. */}
        <div className={style['stat__container']}>
          {/* // Создаем div с классом stat__container. */}
          <p>{formatDate(stat.date)}</p>
          {/* // Вставляем отформатированную дату. */}
        </div>
        <div className={style['stat__container']}>
          {/* // Создаем div с классом stat__container. */}
          <p className={`${style['stat__icon']} ${style['stat__icon-views']}`}>{stat.viewsCount}</p>
          {/* // Вставляем количество просмотров с классами stat__icon и stat__icon-views. */}
        </div>
        <div className={style['stat__container']}>
          {/* // Создаем div с классом stat__container. */}
          {stat.commentsCount && (
            // Если количество комментариев присутствует, отображаем его.

            <p className={`${style['stat__icon']} ${style['stat__icon-comments']}`}>{stat.commentsCount}</p>
            // Вставляем количество комментариев с классами stat__icon и stat__icon-comments.
          )}
        </div>
      </div>
    </>
  );
};

export default NewsStat;
// Экспортируем компонент NewsStat по умолчанию.
