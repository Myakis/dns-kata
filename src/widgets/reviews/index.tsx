import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Review from './components/Review';
import Pagination from './components/Pagination';
import StarsFilter from './components/StarsFilter';

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
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedStars((prevSelectedStars) => [...prevSelectedStars, value]);
    } else {
      setSelectedStars((prevSelectedStars) => prevSelectedStars.filter((star) => star !== value));
    }
  };

  return (
    // <div>
    //   <h1>Отзывы</h1>
    //   {reviews.map((review) => (
    //     <div key={review.id}>
    //       <h2>Отзыв #{review.id}</h2>
    //       <p>Продукт ID: {review.productId}</p>
    //       <p>Плюсы: {review.comment.pluses}</p>
    //       <p>Минусы: {review.comment.minuses}</p>
    //       <p>Текст отзыва: {review.comment.commentText}</p>
    //       <p>Рейтинг: {review.rating}</p>
    //     </div>
    //   ))}
    // </div>
    <div className='ow-opinions-container'>
      <div className='ow-filters opinions-widget__filters' data-role='filters'>
        <div className='ow-filters__counts-filters-wrapper'>
          <div className='ow-filters__count-filter-btn ow-filters__count-filter-btn_active'>
            Все отзывы{' '}
            <span
              className='ow-filters__count-filter-btn-count ow-filters__count-filter-btn-count_active'
              data-role='btn-count'
            >
              {reviews.length}
            </span>
          </div>
          <div className='ow-filters__count-filter-btn'>
            Только к этой модели{' '}
            <span className='ow-filters__count-filter-btn-count' data-role='btn-count'>
              {reviews.length}
            </span>
          </div>
        </div>
        <div className='ow-filters__search-filters-wrapper'>
          <div className='ow-filters__search' data-role='filter-search'>
            <input
              type='text'
              className='ow-filters__search-input'
              name='search'
              value=''
              placeholder='Поиск по отзывам...'
            />
            <span className='ow-filters__search-icon ow-filters__search-icon_search'></span>
            <span className='ow-filters__search-icon ow-filters__search-icon_clear ow-filters__search-icon_hidden'></span>
          </div>
        </div>
        <StarsFilter reviews={reviews} handleCheckboxChange={handleCheckboxChange} selectedStars={selectedStars} />
        <div id='bottom-opinions-filters' style={{ visibility: 'hidden' }}></div>
      </div>
      <Review reviews={currentReviews} loading={loading} />
      <div className='opinions-widget__pagination'>
        <div className='paginator-widget'>
          <div
            className='paginator-widget__block  paginator-widget__block_above'
            style={{ display: 'flex' }}
            onClick={addReviews}
          >
            <a href='!#' className='paginator-widget__more'>
              Показать ещё
            </a>
          </div>
          <Pagination
            reviewsPerPage={reviewsPerPage}
            totalREviews={reviews.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            reviews={reviews}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
