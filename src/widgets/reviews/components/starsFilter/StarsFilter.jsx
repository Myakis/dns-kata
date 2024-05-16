import React, { useState, useMemo, useCallback } from 'react';
import styles from './starsFilter.module.scss';
import PropTypes from 'prop-types';

const StarsFilter = ({ reviews, handleCheckboxChange, selectedStars, notFound }) => {
  const [filteredReviews, setFilteredReviews] = useState(null);

  useMemo(() => {
    const filtered = reviews.reduce((acc, review) => {
      const { rating } = review;

      return { ...acc, [rating]: acc[rating] ? [...acc[rating], review] : [review] };
    }, {});

    setFilteredReviews(filtered);
  }, [reviews]);

  const getFilteredLength = (arr) => (notFound || !arr ? 0 : arr.length);

  const handleChange = useCallback(
    (rating) => {
      handleCheckboxChange(rating);
    },
    [handleCheckboxChange]
  );

  return (
    <div className={`${styles.owFilters__rating} ${styles.uiCheckboxGroup}`} data-role='filter-rating'>
      {[5, 4, 3, 2, 1].map((rating) => (
        <label
          key={rating}
          className={`${styles.uiCheckbox} ${styles.owFilters__ratingItem}`}
          htmlFor={`stars${rating}`}
        >
          <span>
            {[...Array(rating)].map((_, index) => (
              <i key={index}></i>
            ))}
            <div className={styles.owFilters__ratingItem_count}>
              {filteredReviews ? getFilteredLength(filteredReviews[rating]) : 0}
            </div>
          </span>
          <input
            type='checkbox'
            className={styles.uiCheckbox__input}
            checked={selectedStars.includes(rating)}
            onChange={() => handleChange(rating)}
            id={`stars${rating}`}
          />
          <span className={styles.uiCheckbox__box}></span>
        </label>
      ))}
    </div>
  );
};

StarsFilter.propTypes = {
  reviews: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  selectedStars: PropTypes.array.isRequired,
  notFound: PropTypes.bool.isRequired,
};

export default StarsFilter;
