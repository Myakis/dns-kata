import React, { useState, useMemo, useCallback } from 'react';
import styles from './starsFilter.module.scss';
import { IReview } from 'widgets/reviews/components/review/types';
import clsx from 'clsx';

interface StarsFilterProps {
  reviews: IReview[];
  handleCheckboxChange: (rating: number) => void;
  selectedStars: number[];
  notFound: boolean;
}

const StarsFilter: React.FC<StarsFilterProps> = ({ reviews, handleCheckboxChange, selectedStars, notFound }) => {
  const [filteredReviews, setFilteredReviews] = useState<Record<number, IReview[]> | null>(null);

  useMemo(() => {
    const filtered = reviews.reduce<Record<number, IReview[]>>((acc, review) => {
      const { rating } = review;

      return { ...acc, [rating]: acc[rating] ? [...acc[rating], review] : [review] };
    }, {});

    setFilteredReviews(filtered);
  }, [reviews]);

  const getFilteredLength = (arr: IReview[] | undefined): number => (notFound || !arr ? 0 : arr.length);

  const handleChange = useCallback(
    (rating: number) => {
      handleCheckboxChange(rating);
    },
    [handleCheckboxChange]
  );

  return (
    <div className={clsx(styles.owFilters__rating, styles.uiCheckboxGroup)} data-role='filter-rating'>
      {[5, 4, 3, 2, 1].map((rating) => (
        <label key={rating} className={clsx(styles.uiCheckbox, styles.owFilters__ratingItem)} htmlFor={`stars${rating}`}>
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

export default StarsFilter;
