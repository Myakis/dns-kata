import { FC } from 'react';
// Импортируем FC (Functional Component) из библиотеки React.

import clsx from 'clsx';
// Импортируем библиотеку clsx, которая используется для условного присвоения классов.

import { filters } from './constants/filters';
// Импортируем константу filters из файла constants/filters в текущей директории.

import style from './style.module.scss';
// Импортируем стили из файла style.module.scss.

interface INewsNav {
  type: string;
  handlerFilter: (filtr: string) => void;
}
// Определяем интерфейс INewsNav с двумя свойствами: type (строка) и handlerFilter (функция, принимающая строку и ничего не возвращающая).

const NewsNav: FC<INewsNav> = ({ type, handlerFilter }) => {
  // Создаем функциональный компонент NewsNav, который принимает пропсы типа INewsNav.

  const renderButtons = (filters: { name: string; filter: string }[]) => {
    // Определяем функцию renderButtons, которая принимает массив объектов с полями name и filter.

    return filters.map((item) => {
      // Проходим по массиву filters с помощью метода map и для каждого элемента создаём кнопку.

      return (
        <button
          key={self.crypto.randomUUID()}
          // Задаем уникальный ключ для каждого элемента с помощью метода randomUUID().
          type='button'
          // Устанавливаем тип кнопки как 'button'.
          onClick={() => handlerFilter(item.filter)}
          // Задаем обработчик клика, который вызывает функцию handlerFilter с аргументом item.filter.
          className={clsx(style.nav__button, type === item.filter && style['nav__button_active'])}
          // Используем clsx для задания классов: всегда style.nav__button и дополнительно style['nav__button_active'], если type совпадает с item.filter.
        >
          <p>{item.name}</p>
        </button>
      );
    });
  };

  const buttons = renderButtons(filters);
  // Вызываем функцию renderButtons с аргументом filters и сохраняем результат в переменную buttons.

  return (
    <div className={style['container__scroll']}>
      <div className={style['container__shadow']}>
        <div className={style['nav']}>{buttons}</div>
      </div>
      <span className={style['nav--shadow']}></span>
    </div>
  );
};

export default NewsNav;
// Экспортируем компонент NewsNav по умолчанию.
