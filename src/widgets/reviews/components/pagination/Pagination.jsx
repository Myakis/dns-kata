import styles from './pagination.module.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Pagination = ({ reviewsPerPage, totalReviews, paginate }) => {
  const [activePage, setActivePage] = useState(1);
  const [firstSlice, setFirstSlice] = useState(totalReviews - totalReviews);
  const [lastSlice, setLastSlice] = useState(totalReviews - totalReviews + 8);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  const updatePagination = (number) => {
    setActivePage(number);
    paginate(number);
    if (number > 4 && lastSlice !== pageNumbers.length) {
      setFirstSlice((prev) => prev + 1);
      setLastSlice((prev) => prev + 1);
    } else if (number < 6 && firstSlice !== 0) {
      setFirstSlice((prev) => prev - 1);
      setLastSlice((prev) => prev - 1);
    }
  };

  const handleClick = (number) => {
    updatePagination(number);
  };

  const nextPage = () => {
    const next = activePage + 1;

    if (next <= pageNumbers.length) {
      setActivePage(next);
      paginate(next);
      if (next > 4 && lastSlice !== pageNumbers.length) {
        setFirstSlice((prev) => prev + 1);
        setLastSlice((prev) => prev + 1);
      }
    }
  };

  const prevPage = () => {
    const prev = activePage - 1;

    if (prev >= 1) {
      setActivePage(prev);
      paginate(prev);
      if (prev < 6 && firstSlice !== 0) {
        setFirstSlice((prev) => prev - 1);
        setLastSlice((prev) => prev - 1);
      }
    }
  };

  const firstPage = () => {
    setActivePage(1);
    paginate(1);
    setFirstSlice(0);
    setLastSlice(8);
  };

  const lastPage = () => {
    const last = Math.ceil(totalReviews / reviewsPerPage);

    setActivePage(last);
    paginate(last);
    setFirstSlice(last - 8);
    setLastSlice(last);
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
          style={{ flexBasis: `${Math.ceil(totalReviews / reviewsPerPage) * 52}px` }}
        >
          {pageNumbers.slice(firstSlice, lastSlice).map((number) => (
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
