import styles from './pagination.module.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Pagination = ({ reviewsPerPage, totalREviews, paginate }) => {
  const [activePage, setActivePage] = useState(1); // Состояние для отслеживания активной страницы

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalREviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setActivePage(number); // Устанавливаем активную страницу при клике
    paginate(number);
  };

  const nextPage = () => {
    const next = activePage + 1; // Получаем номер следующей страницы

    if (next <= pageNumbers.length) {
      // Проверяем, что следующая страница существует
      setActivePage(next); // Устанавливаем следующую страницу как активную
      paginate(next); // Вызываем функцию paginate для перехода на следующую страницу
    }
  };

  const prevPage = () => {
    const prev = activePage - 1; // Получаем номер предыдущей страницы

    if (prev >= 1) {
      // Проверяем, что предыдущая страница существует
      setActivePage(prev); // Устанавливаем предыдущую страницу как активную
      paginate(prev); // Вызываем функцию paginate для перехода на предыдущую страницу
    }
  };

  const firstPage = () => {
    setActivePage(1);
    paginate(1);
  };

  const lastPage = () => {
    const last = Math.ceil(totalREviews / reviewsPerPage); // Получаем номер последней страницы

    setActivePage(last); // Устанавливаем последнюю страницу как активную
    paginate(last); // Вызываем функцию paginate для перехода на последнюю страницу
  };

  return (
    <div className={styles.paginatorWidget__block}>
      <div className={styles.paginatorWidget__pages}>
        <a
          href='!#'
          className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_first}`}
          onClick={firstPage}
        >
          {}
        </a>
        <a
          href='!#'
          className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_prev}`}
          onClick={prevPage}
        >
          {}
        </a>
        <ul
          className={styles.paginatorWidget__pagesList}
          style={{ flexBasis: `${Math.ceil(totalREviews / reviewsPerPage) * 65}px` }}
        >
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href={'!#'}
                className={`${styles.paginatorWidget__page} ${activePage === number ? styles.paginatorWidget__page_active : ''}`}
                onClick={() => handleClick(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
        <a
          href='!#'
          className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_next}`}
          onClick={nextPage}
        >
          {}
        </a>
        <a
          href='!#'
          className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_last}`}
          onClick={lastPage}
        >
          {}
        </a>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  reviewsPerPage: PropTypes.number.isRequired,
  totalREviews: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
