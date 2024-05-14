import styles from './search.module.scss';
import PropTypes from 'prop-types';

import React, { useState } from 'react';

const Search = ({ reviews, setReviews, setNotFound }) => {
  const [value, setValue] = useState('');
  const [initialReviews, setInitialReviews] = useState([]);

  const saveValue = (e) => {
    e.preventDefault();

    // Проверяем, что значение введено и не пустое
    if (value.trim() !== '') {
      // Фильтруем отзывы по введенному значению
      const filteredReviews = reviews.filter((review) =>
        review.comment.commentText.toLowerCase().includes(value.toLowerCase())
      );

      // Проверяем, нашли ли что-то
      if (filteredReviews.length > 0) {
        // Устанавливаем отфильтрованные отзывы
        if (initialReviews.length === 0) {
          setInitialReviews([...reviews]);
        }
        setReviews(filteredReviews);
        setNotFound(false); // Сбрасываем состояние "Ничего не нашлось"
      } else {
        setNotFound(true); // Устанавливаем состояние "Ничего не нашлось"
      }
    } else {
      // Если значение пустое, возвращаем исходные отзывы
      setReviews([...reviews]);
      setNotFound(false); // Сбрасываем состояние "Ничего не нашлось"
    }
  };

  const clearFilteredReviews = () => {
    setValue(''); // Сбросить значение ввода
    if (initialReviews.length > 0) {
      setReviews(initialReviews); // Сбросить отзывы до начального состояния
      setInitialReviews([]); // Очистить initialReviews
    }
  };

  return (
    <div className={styles.owFilters__searchFiltersWrapper}>
      <form className={styles.owFilters__search} onSubmit={saveValue}>
        <input
          type='text'
          className={styles.owFilters__searchInput}
          name='search'
          value={value}
          placeholder='Поиск по отзывам...'
          onChange={(e) => setValue(e.target.value)}
        />
        <span
          className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_search}`}
          onClick={saveValue}
        ></span>
        <span
          className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_clear} ${value.trim() === '' ? styles.owFilters__searchIcon_hidden : ''}`} // Условное добавление класса для скрытия иконки очистки
          onClick={() => clearFilteredReviews()} // Очистка значения при клике на иконку очистки
        ></span>
      </form>
    </div>
  );
};

Search.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  setReviews: PropTypes.func.isRequired,
  setNotFound: PropTypes.func.isRequired,
};

export default Search;
