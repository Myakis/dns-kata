import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './reviews.module.scss';
import Review from './components/review';
import Pagination from './components/pagination';
import StarsFilter from './components/starsFilter';
import Search from './components/search';
import { useGetReviewsQuery } from 'shared/api/DNS';
import { IReview } from 'widgets/reviews/components/review/types';

const Reviews: React.FC = () => {
  const { data: serverReviews, isLoading } = useGetReviewsQuery('');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewsPerPage] = useState<number>(10);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [addReviewsStatus, setAddReviewsStatus] = useState<boolean>(false);
  const [totalReviews, setTotalReviews] = useState<number>(reviews.length);
  const [lastReviewsIndex, setLastReviewsIndex] = useState<number>(10);
  const [initialReviews, setInitialReviews] = useState<IReview[]>([]);
  const allReviews = useRef(reviews.length);

  useEffect(() => {
    if (serverReviews) {
      setReviews(serverReviews);
      setInitialReviews(serverReviews); // Сохраняем изначальные отзывы
      setTotalReviews(serverReviews.length); // Обновляем totalReviews после получения отзывов с сервера
      allReviews.current = serverReviews.length; // Обновляем значение allReviews
    }
  }, [serverReviews]);

  useEffect(() => {
    setAddReviewsStatus(false);
    if (!selectedStars.length) {
      setTotalReviews(reviews.length);
    }
  }, [selectedStars, reviews.length]);

  const firstReviewsIndex: number = lastReviewsIndex - reviewsPerPage;
  const filteredReviews = reviews.filter((review) => selectedStars.includes(review.rating));

  const [lastReviewsIndexAddTen, setLastReviewsIndexAddTen] = useState<number>(lastReviewsIndex);

  const filteredCurrentReviews = filteredReviews.slice(
    firstReviewsIndex,
    addReviewsStatus ? lastReviewsIndexAddTen : lastReviewsIndex
  );
  const currentReviews: IReview[] = reviews.slice(
    firstReviewsIndex,
    addReviewsStatus ? lastReviewsIndexAddTen : lastReviewsIndex
  );
  const paginate = (pageNumber: number) => {
    setLastReviewsIndex(pageNumber * reviewsPerPage);
    setLastReviewsIndexAddTen(pageNumber * reviewsPerPage); // Обновляем lastReviewsIndexAddTen при изменении страницы
  };

  const addReviews = () => {
    if (lastReviewsIndexAddTen !== totalReviews) {
      setLastReviewsIndexAddTen((prev) => prev + 10);
    }
    setAddReviewsStatus(true);
  };

  const handleCheckboxChange = (value: number) => {
    let updatedStars = [];

    if (selectedStars.includes(value)) {
      updatedStars = selectedStars.filter((star) => star !== value);
    } else {
      updatedStars = [...selectedStars, value];
    }

    // Если не выбраны никакие звезды, totalReviews должно быть равно reviews.length
    const newTotalReviews = !updatedStars.length
      ? reviews.length
      : reviews.filter((review) => updatedStars.includes(review.rating)).length;

    // Обновляем состояние выбранных звезд и общее количество отзывов
    setSelectedStars(updatedStars);
    setTotalReviews(newTotalReviews);
  };

  const handleReset = () => {
    setReviews(initialReviews);
    setNotFound(false);
  };

  return (
    <div className={styles.owOpinionsContainer}>
      <div className={clsx(styles.owFilters, styles.opinionsWidget__filters)}>
        <div className={styles.owFilters__countsFiltersWrapper}>
          <div className={clsx(styles.owFilters__countFilterBtn, styles.owFilters__countFilterBtn_active)}>
            Все отзывы{' '}
            <span className={clsx(styles.owFilters__countFilterBtnCount, styles.owFilters__countFilterBtnCount_active)}>
              {allReviews.current}
            </span>
          </div>
          <div className={styles.owFilters__countFilterBtn}>
            Только к этой модели <span className={styles.owFilters__countFilterBtnCount}>{allReviews.current}</span>
          </div>
        </div>
        <Search reviews={reviews} setReviews={setReviews} setNotFound={setNotFound} />
        <StarsFilter
          reviews={reviews}
          handleCheckboxChange={handleCheckboxChange}
          selectedStars={selectedStars}
          notFound={notFound}
        />
        <div id='bottom-opinions-filters' style={{ visibility: 'hidden' }}></div>
      </div>
      {/* Выводим верстку, если поиск ничего не находит */}
      {notFound && (
        <div
          className={clsx(styles.owOpinions, styles.opinionsWidget__opinions)}
          id='opinionsBlock'
          style={{ opacity: 1 }}
        >
          <div className={styles.owOpinions__notFound}>
            <div className={styles.owOpinions__notFound_image}></div>
            <div className={styles.owOpinions__notFound_content}>
              <div className={styles.owOpinions__notFound_title}>Ничего не нашлось</div>
              <div className={styles.owOpinions__notFound_text}>Попробуйте изменить критерии поиска</div>
              <button
                className={clsx(
                  styles.buttonUi,
                  styles.buttonUi_white,
                  styles.buttonUi_md,
                  styles.owOpinions__notFound_button
                )}
                onClick={handleReset}
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
          loading={isLoading}
          selectedStars={selectedStars}
          filteredCurrentReviews={filteredCurrentReviews}
        />
      )}
      {/* Скрывыем блок пагинации, если поиск не дал результатов */}
      {totalReviews > 0 && totalReviews / lastReviewsIndexAddTen >= 1 && !notFound && (
        <div className={styles.opinionsWidget__pagination}>
          <div className={styles.paginatorWidget}>
            <div
              className={clsx(styles.paginatorWidget__block, styles.paginatorWidget__block_above)}
              style={{ display: 'flex' }}
              onClick={addReviews}
            >
              <div className={styles.paginatorWidget__more}>Показать ещё</div>
            </div>
            <Pagination
              reviewsPerPage={reviewsPerPage}
              totalReviews={totalReviews}
              paginate={paginate}
              addReviewsStatus={addReviewsStatus}
              lastReviewsIndexAddTen={lastReviewsIndexAddTen}
              setAddReviewsStatus={setAddReviewsStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
