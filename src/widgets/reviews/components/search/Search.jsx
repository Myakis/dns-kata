import styles from './search.module.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Search = ({ reviews, setReviews, setNotFound }) => {
  // Состояния компонента: value - текущее значение в поле поиска, initialReviews - изначальный список отзывов
  const [value, setValue] = useState('');
  const [initialReviews, setInitialReviews] = useState([]);

  // Функция для обработки события сохранения значения в поле поиска
  const saveValue = (e) => {
    e.preventDefault(); // Предотвращение стандартного действия формы
    const trimmedValue = value.trim(); // Удаление пробелов с начала и конца строки
    const filteredReviews = trimmedValue
      ? reviews.filter((review) => review.comment.commentText.toLowerCase().includes(trimmedValue.toLowerCase()))
      : reviews; // Фильтрация отзывов в соответствии с введенным значением

    setReviews(filteredReviews); // Установка отфильтрованных отзывов
    setNotFound(filteredReviews.length === 0); // Установка флага, указывающего на то, что отзывы не найдены
    if (trimmedValue && initialReviews.length === 0) {
      setInitialReviews([...reviews]); // Сохранение изначального списка отзывов при первом фильтровании
    }
  };

  // Функция для очистки отфильтрованных отзывов и сброса значения в поле поиска
  const clearFilteredReviews = () => {
    setValue(''); // Сброс значения в поле поиска
    setReviews(initialReviews.length > 0 ? initialReviews : reviews); // Восстановление изначального списка отзывов
    setInitialReviews([]); // Очистка списка изначальных отзывов
  };

  const trimmedValue = value.trim();

  return (
    <div className={styles.owFilters__searchFiltersWrapper}>
      {/* Форма поиска */}
      <form className={styles.owFilters__search} onSubmit={saveValue}>
        {/* Поле ввода для поиска */}
        <input
          type='text'
          className={styles.owFilters__searchInput}
          name='search'
          value={value}
          placeholder='Поиск по отзывам...'
          onChange={(e) => setValue(e.target.value)} // Обработка изменения значения в поле ввода
        />
        {/* Иконка для запуска поиска */}
        <span
          className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_search}`}
          onClick={saveValue}
        ></span>
        {/* Иконка для очистки поля поиска */}
        <span
          className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_clear} ${!trimmedValue ? styles.owFilters__searchIcon_hidden : ''}`}
          onClick={clearFilteredReviews}
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
