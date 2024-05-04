import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './reviews.module.scss';
import Review from './components/review/';
import Pagination from './components/pagination/';
import StarsFilter from './components/starsFilter';
import Search from './components/search';

interface ReviewData {
  id: number;
  productId: number;
  comment: {
    pluses: string;
    minuses: string;
    commentText: string;
  };
  rating: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewsPerPage, setReviewsPerPage] = useState<number>(10);
  const [selectedStars, setSelectedStars] = useState([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ReviewData[]>('http://localhost:8000/reviews');

        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    setReviewsPerPage(10);
  }, [currentPage]);

  const lastReviewsIndex: number = currentPage * reviewsPerPage;
  const firstReviewsIndex: number = lastReviewsIndex - reviewsPerPage;
  const currentReviews: ReviewData[] = reviews.slice(firstReviewsIndex, lastReviewsIndex);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const addReviews = () => {
    setReviewsPerPage((prev) => prev + 10);
  };

  const handleCheckboxChange = (value) => {
    console.log('Checkbox value:', value);
    console.log('Selected stars before update:', selectedStars);

    if (selectedStars.includes(value)) {
      setSelectedStars(selectedStars.filter((star) => star !== value));
    } else {
      setSelectedStars([...selectedStars, value]);
    }

    console.log('Selected stars after update:', selectedStars);
  };

  return (
    <div className={styles.owOpinionsContainer}>
      <div className={`${styles.owFilters} ${styles.opinionsWidget__filters}`} data-role='filters'>
        <div className={styles.owFilters__countsFiltersWrapper}>
          <div className={`${styles.owFilters__countFilterBtn} ${styles.owFilters__countFilterBtn_active}`}>
            Все отзывы{' '}
            <span
              className={`${styles.owFilters__countFilterBtnCount} ${styles.owFilters__countFilterBtnCount_active}`}
              data-role='btn-count'
            >
              {reviews.length}
            </span>
          </div>
          <div className={styles.owFilters__countFilterBtn}>
            Только к этой модели{' '}
            <span className={styles.owFilters__countFilterBtnCount} data-role='btn-count'>
              {reviews.length}
            </span>
          </div>
        </div>
        <Search reviews={reviews} setReviews={setReviews} setNotFound={setNotFound} />
        <StarsFilter reviews={reviews} handleCheckboxChange={handleCheckboxChange} selectedStars={selectedStars} />
        <div id='bottom-opinions-filters' style={{ visibility: 'hidden' }}></div>
      </div>
      {/* Выводим верстку, если поиск ничего не находит */}
      {notFound && (
        <div
          className={`${styles.owOpinions} ${styles.opinionsWidget__opinions}`}
          data-role='opinionsContainer'
          id='opinionsBlock'
          style={{ opacity: 1 }}
        >
          <div className={styles.owOpinions__notFound} data-role='not-found'>
            <div className={styles.owOpinions__notFound_image}></div>
            <div className={styles.owOpinions__notFound_content}>
              <div className={styles.owOpinions__notFound_title}>Ничего не нашлось</div>
              <div className={styles.owOpinions__notFound_text}>Попробуйте изменить критерии поиска</div>
              <button
                className={`${styles.buttonUi} ${styles.buttonUi_white} ${styles.buttonUi_md} ${styles.owOpinions__notFound_button}`}
                data-role='reset-button'
                onClick={() => setNotFound(false)}
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Выводим отзывы, если поиск дал результаты */}
      {!notFound && <Review reviews={currentReviews} loading={loading} selectedStars={selectedStars} />}
      <div className={styles.opinionsWidget__pagination}>
        <div className={styles.paginatorWidget}>
          <div
            className={`${styles.paginatorWidget__block} ${styles.paginatorWidget__block_above}`}
            style={{ display: 'flex' }}
            onClick={addReviews}
          >
            <a href='!#' className={styles.paginatorWidget__more}>
              Показать ещё
            </a>
          </div>
          <Pagination reviewsPerPage={reviewsPerPage} totalREviews={reviews.length} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
