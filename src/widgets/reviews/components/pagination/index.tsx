import styles from './pagination.module.scss';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface PaginationProps {
  reviewsPerPage: number;
  totalReviews: number;
  paginate: (pageNumber: number) => void;
  addReviewsStatus: boolean;
  setAddReviewsStatus: React.Dispatch<React.SetStateAction<boolean>>;
  lastReviewsIndexAddTen: number;
}

const Pagination: React.FC<PaginationProps> = ({
  reviewsPerPage,
  totalReviews,
  paginate,
  addReviewsStatus,
  setAddReviewsStatus,
  lastReviewsIndexAddTen,
}) => {
  const [activePage, setActivePage] = useState<number>(1); // Активная страница
  const [firstSlice, setFirstSlice] = useState<number>(0);
  const [lastSlice, setLastSlice] = useState<number>(8);
  const pageNumbers: number[] = []; // Массив для хранения номеров страниц

  // Генерация номеров страниц на основе totalReviews и reviewsPerPage
  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Функция для обновления пагинации при клике на номер страницы
  const updatePagination = (number: number) => {
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

  // Функция для обработки клика на номер страницы
  const handleClick = (number: number) => {
    updatePagination(number);
    setAddReviewsStatus(false); // Сброс addReviewsStatus
  };

  // Функция для перехода на следующую страницу
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

  // Функция для перехода на предыдущую страницу
  const prevPage = () => {
    const prev = activePage - 1;

    if (prev >= 1) {
      setActivePage(prev);
      paginate(prev);
      if (prev < 6 && firstSlice !== 0) {
        setFirstSlice((prev) => prev - 1);
        setLastSlice((prev) => prev - 1);
      }
      setAddReviewsStatus(false);
    }
  };

  // Функция для перехода на первую страницу
  const firstPage = () => {
    setActivePage(1);
    paginate(1);
    setFirstSlice(0);
    setLastSlice(8);
    setAddReviewsStatus(false);
  };

  // Функция для перехода на последнюю страницу
  const lastPage = () => {
    const last = Math.ceil(totalReviews / reviewsPerPage);

    setActivePage(last);
    paginate(last);
    setFirstSlice(last - 8);
    setLastSlice(last);
    setAddReviewsStatus(false);
  };

  // Эффект для автоматического перехода на следующую страницу при добавлении новых отзывов
  useEffect(() => {
    addReviewsStatus && nextPage();
  }, [lastReviewsIndexAddTen]);

  return (
    <div className={styles.paginatorWidget__block}>
      <div className={styles.paginatorWidget__pages}>
        {/* Кнопка для перехода на первую страницу */}
        <div className={clsx(styles.paginatorWidget__page, styles.paginatorWidget__page_first)} onClick={firstPage}>
          {}
        </div>
        {/* Кнопка для перехода на предыдущую страницу */}
        <div className={clsx(styles.paginatorWidget__page, styles.paginatorWidget__page_prev)} onClick={prevPage}>
          {}
        </div>
        {/* Список номеров страниц */}
        <ul
          className={styles.paginatorWidget__pagesList}
          style={{ flexBasis: `${Math.ceil(totalReviews / reviewsPerPage) * 52}px` }}
        >
          {pageNumbers.slice(firstSlice, lastSlice).map((number) => (
            <li key={number}>
              <div
                className={clsx(styles.paginatorWidget__page, {
                  [styles.paginatorWidget__page_active]: activePage === number,
                })}
                onClick={() => handleClick(number)}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
        {/* Кнопка для перехода на следующую страницу */}
        <div className={clsx(styles.paginatorWidget__page, styles.paginatorWidget__page_next)} onClick={nextPage}>
          {}
        </div>
        {/* Кнопка для перехода на последнюю страницу */}
        <div className={clsx(styles.paginatorWidget__page, styles.paginatorWidget__page_last)} onClick={lastPage}>
          {}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
