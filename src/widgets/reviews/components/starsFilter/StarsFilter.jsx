import React, { useState, useEffect } from 'react';
import styles from './starsFilter.module.scss';

const StarsFilter = ({ reviews, handleCheckboxChange, selectedStars }) => {
  const [fiveStars, setFiveStars] = useState([]);
  const [fourStars, setFourStars] = useState([]);
  const [threeStars, setThreeStars] = useState([]);
  const [twoStars, setTwoStars] = useState([]);
  const [oneStars, setOneStars] = useState([]);

  useEffect(() => {
    const filteredReviews = reviews.reduce(
      (acc, review) => {
        if (review.rating === 5) {
          return { ...acc, fiveStars: [...acc.fiveStars, review] };
        } else if (review.rating === 4) {
          return { ...acc, fourStars: [...acc.fourStars, review] };
        } else if (review.rating === 3) {
          return { ...acc, threeStars: [...acc.threeStars, review] };
        } else if (review.rating === 2) {
          return { ...acc, twoStars: [...acc.twoStars, review] };
        } else {
          return { ...acc, oneStars: [...acc.oneStars, review] };
        }
      },
      { fiveStars: [], fourStars: [], threeStars: [], twoStars: [], oneStars: [] }
    );

    setFiveStars(filteredReviews.fiveStars);
    setFourStars(filteredReviews.fourStars);
    setThreeStars(filteredReviews.threeStars);
    setTwoStars(filteredReviews.twoStars);
    setOneStars(filteredReviews.oneStars);
  }, [reviews]);

  return (
    <div className={`${styles.owFilters__rating} ${styles.uiCheckboxGroup}`} data-role='filter-rating'>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{fiveStars.length}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(5)} // Устанавливаем атрибут checked в зависимости от выбранных звезд
          onChange={() => handleCheckboxChange(5)} // Обработчик изменения состояния чекбокса
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{fourStars.length}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(4)} // Устанавливаем атрибут checked в зависимости от выбранных звезд
          onChange={() => handleCheckboxChange(4)} // Обработчик изменения состояния чекбокса
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{threeStars.length}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(3)} // Устанавливаем атрибут checked в зависимости от выбранных звезд
          onChange={() => handleCheckboxChange(3)} // Обработчик изменения состояния чекбокса
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}>
        <span>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{twoStars.length}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(2)} // Устанавливаем атрибут checked в зависимости от выбранных звезд
          onChange={() => handleCheckboxChange(2)} // Обработчик изменения состояния чекбокса
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}>
        <span>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{oneStars.length}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(1)} // Устанавливаем атрибут checked в зависимости от выбранных звезд
          onChange={() => handleCheckboxChange(1)} // Обработчик изменения состояния чекбокса
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
    </div>
  );
};

export default StarsFilter;
