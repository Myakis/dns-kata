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
  const [reviewsPerPage] = useState<number>(10);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [addReviewsStatus, setAddReviewsStatus] = useState<boolean>(false);
  const [totalReviews, setTotalReviews] = useState<number>(reviews.length);
  const [lastReviewsIndex, setLastReviewsIndex] = useState<number>(10);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ReviewData[]>('http://localhost:8000/reviews');

        setReviews(response.data);
        setTotalReviews(response.data.length); // Обновляем totalReviews после получения отзывов с сервера
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    setAddReviewsStatus(false);
    setTotalReviews(reviews.length);
  }, [currentPage, reviews.length]);

  const firstReviewsIndex: number = lastReviewsIndex - reviewsPerPage;
  const filteredReviews = reviews.filter((review) => selectedStars.includes(review.rating));

  const [lastReviewsIndexAddTen, setLastReviewsIndexAddTen] = useState<number>(lastReviewsIndex);

  const filteredCurrentReviews = filteredReviews.slice(
    firstReviewsIndex,
    addReviewsStatus ? lastReviewsIndexAddTen : lastReviewsIndex
  );
  const currentReviews: ReviewData[] = reviews.slice(
    firstReviewsIndex,
    addReviewsStatus ? lastReviewsIndexAddTen : lastReviewsIndex
  );
  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    setLastReviewsIndex(pageNumber * reviewsPerPage);
    setLastReviewsIndexAddTen(pageNumber * reviewsPerPage); // Обновляем lastReviewsIndexAddTen при изменении страницы
  };

  console.log('currentPage:', currentPage);

  const addReviews = () => {
    setLastReviewsIndexAddTen((prev) => prev + 10);
    setTotalReviews((prev) => prev - 10);
    setAddReviewsStatus(true);
  };

  console.log('lastReviewsIndexAddTen:', lastReviewsIndexAddTen);
  console.log('totalReviews:', totalReviews);

  const handleCheckboxChange = (value: number) => {
    console.log('Checkbox value:', value);
    console.log('Selected stars before update:', selectedStars);

    let updatedStars = [];

    if (selectedStars.includes(value)) {
      updatedStars = selectedStars.filter((star) => star !== value);
    } else {
      updatedStars = [...selectedStars, value];
    }

    // Если не выбраны никакие звезды, totalReviews должно быть равно reviews.length
    const newTotalReviews =
      updatedStars.length === 0
        ? reviews.length
        : reviews.filter((review) => updatedStars.includes(review.rating)).length;

    // Обновляем состояние выбранных звезд и общее количество отзывов
    setSelectedStars(updatedStars);
    setTotalReviews(newTotalReviews);

    console.log('Selected stars after update:', updatedStars);
  };

  console.log(addReviewsStatus);

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
      {!notFound && (
        <Review
          reviews={currentReviews}
          loading={loading}
          selectedStars={selectedStars}
          filteredCurrentReviews={filteredCurrentReviews}
        />
      )}
      <div className={styles.opinionsWidget__pagination}>
        <div className={styles.paginatorWidget}>
          <div
            className={`${styles.paginatorWidget__block} ${styles.paginatorWidget__block_above}`}
            style={{ display: 'flex' }}
            onClick={addReviews}
          >
            <div className={styles.paginatorWidget__more}>Показать ещё</div>
          </div>
          <Pagination reviewsPerPage={reviewsPerPage} totalReviews={totalReviews} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
