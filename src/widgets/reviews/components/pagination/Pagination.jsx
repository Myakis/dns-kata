import styles from './pagination.module.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Pagination = ({ reviewsPerPage, totalReviews, paginate }) => {
  const [activePage, setActivePage] = useState(1); // Состояние для отслеживания активной страницы
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
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
    const last = Math.ceil(totalReviews / reviewsPerPage); // Получаем номер последней страницы

    setActivePage(last); // Устанавливаем последнюю страницу как активную
    paginate(last); // Вызываем функцию paginate для перехода на последнюю страницу
  };

  return (
    <div className={styles.paginatorWidget__block}>
      <div className={styles.paginatorWidget__pages}>
        <div className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_first}`} onClick={firstPage}>
          {}
        </div>
        <div className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_prev}`} onClick={prevPage}>
          {}
        </div>
        <ul
          className={styles.paginatorWidget__pagesList}
          style={{ flexBasis: `${Math.ceil(totalReviews / reviewsPerPage) * 65}px` }}
        >
          {pageNumbers.map((number) => (
            <li key={number}>
              <div
                className={`${styles.paginatorWidget__page} ${activePage === number ? styles.paginatorWidget__page_active : ''}`}
                onClick={() => handleClick(number)}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
        <div className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_next}`} onClick={nextPage}>
          {}
        </div>
        <div className={`${styles.paginatorWidget__page} ${styles.paginatorWidget__page_last}`} onClick={lastPage}>
          {}
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  reviewsPerPage: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
