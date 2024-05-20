import { IReview } from 'widgets/reviews/components/review/types';
import styles from './search.module.scss';
import React, { useState, FC, FormEvent, ChangeEvent } from 'react';
import clsx from 'clsx';

interface SearchProps {
  reviews: IReview[];
  setReviews: (reviews: IReview[]) => void;
  setNotFound: (notFound: boolean) => void;
}

const Search: FC<SearchProps> = ({ reviews, setReviews, setNotFound }) => {
  const [value, setValue] = useState<string>('');
  const [initialReviews, setInitialReviews] = useState<IReview[]>([]);

  const saveValue = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    const filteredReviews = trimmedValue
      ? reviews.filter((review) => review.comment.commentText.toLowerCase().includes(trimmedValue.toLowerCase()))
      : reviews;

    setReviews(filteredReviews);
    setNotFound(filteredReviews.length === 0);
    if (trimmedValue && initialReviews.length === 0) {
      setInitialReviews([...reviews]);
    }
  };

  const clearFilteredReviews = () => {
    setValue('');
    setReviews(initialReviews.length > 0 ? initialReviews : reviews);
    setInitialReviews([]);
  };

  const trimmedValue = value.trim();

  return (
    <div className={styles.owFilters__searchFiltersWrapper}>
      <form className={styles.owFilters__search} onSubmit={saveValue}>
        <input
          type='text'
          className={styles.owFilters__searchInput}
          name='search'
          value={value}
          placeholder='Поиск по отзывам...'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <span
          className={clsx(styles.owFilters__searchIcon, styles.owFilters__searchIcon_search)}
          onClick={saveValue}
        ></span>
        <span
          className={clsx(styles.owFilters__searchIcon, styles.owFilters__searchIcon_clear, {
            [styles.owFilters__searchIcon_hidden]: !trimmedValue,
          })}
          onClick={clearFilteredReviews}
        ></span>
      </form>
    </div>
  );
};

export default Search;
