import React, { useState, useEffect } from 'react';
import styles from './starsFilter.module.scss';
import PropTypes from 'prop-types';

const StarsFilter = ({ reviews, handleCheckboxChange, selectedStars, notFound }) => {
  const [fiveStars, setFiveStars] = useState([]);
  const [fourStars, setFourStars] = useState([]);
  const [threeStars, setThreeStars] = useState([]);
  const [twoStars, setTwoStars] = useState([]);
  const [oneStars, setOneStars] = useState([]);

  const getFilteredLength = (arr, notFound) => {
    return notFound ? 0 : arr.length;
  };

  useEffect(() => {
    const filteredReviews = reviews.reduce(
      (acc, review) => {
        switch (review.rating) {
          case 5:
            return { ...acc, fiveStars: [...acc.fiveStars, review] };
          case 4:
            return { ...acc, fourStars: [...acc.fourStars, review] };
          case 3:
            return { ...acc, threeStars: [...acc.threeStars, review] };
          case 2:
            return { ...acc, twoStars: [...acc.twoStars, review] };
          default:
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
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`} htmlFor='fiveStars'>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{getFilteredLength(fiveStars, notFound)}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(5)}
          onChange={() => handleCheckboxChange(5)}
          id='fiveStars'
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`} htmlFor='fourStars'>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{getFilteredLength(fourStars, notFound)}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(4)}
          onChange={() => handleCheckboxChange(4)}
          id='fourStars'
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`} htmlFor='threeStars'>
        <span>
          <i></i>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{getFilteredLength(threeStars, notFound)}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(3)}
          onChange={() => handleCheckboxChange(3)}
          id='threeStars'
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`} htmlFor='twoStars'>
        <span>
          <i></i>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{getFilteredLength(twoStars, notFound)}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(2)}
          onChange={() => handleCheckboxChange(2)}
          id='twoStars'
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
      <label className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`} htmlFor='oneStars'>
        <span>
          <i></i>
          <div className={styles.owFilters__ratingItem_count}>{getFilteredLength(oneStars, notFound)}</div>
        </span>
        <input
          type='checkbox'
          className={styles.uiCheckbox__input}
          checked={selectedStars.includes(1)}
          onChange={() => handleCheckboxChange(1)}
          id='oneStars'
        />
        <span className={styles.uiCheckbox__box}></span>
      </label>
    </div>
  );
};

StarsFilter.propTypes = {
  reviews: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  selectedStars: PropTypes.array.isRequired,
};

export default StarsFilter;
