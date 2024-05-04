import React, { useState } from 'react';
import styles from './search.module.scss';

const Search = ({ reviews, setReviews, notFound, setNotFound }) => {
  const [value, setValue] = useState('');

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

    // Очищаем значение поля поиска после отправки формы
    setValue('');
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
        <span className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_search}`}></span>
        <span
          className={`${styles.owFilters__searchIcon} ${styles.owFilters__searchIcon_clear} ${value.trim() === '' ? styles.owFilters__searchIcon_hidden : ''}`} // Условное добавление класса для скрытия иконки очистки
          onClick={() => setValue('')} // Очистка значения при клике на иконку очистки
        ></span>
      </form>
    </div>
  );
};

export default Search;
