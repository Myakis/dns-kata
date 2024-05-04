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
          name='grade'
          value='5'
          onChange={handleCheckboxChange}
          checked={selectedStars.includes(5)}
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
          name='grade'
          value='4'
          onChange={handleCheckboxChange}
          checked={selectedStars.includes(4)}
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
          name='grade'
          value='3'
          onChange={handleCheckboxChange}
          checked={selectedStars.includes(3)}
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
          name='grade'
          value='2'
          onChange={handleCheckboxChange}
          checked={selectedStars.includes(2)}
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
          name='grade'
          value='1'
          onChange={handleCheckboxChange}
          checked={selectedStars.includes(1)}
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
    </div>
  );
};

export default StarsFilter;
