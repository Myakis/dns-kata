import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Review {
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
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('http://localhost:8000/reviews');
        
        setReviews(response.data);
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Отзывы</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <h2>Отзыв #{review.id}</h2>
          <p>Продукт ID: {review.productId}</p>
          <p>Плюсы: {review.comment.pluses}</p>
          <p>Минусы: {review.comment.minuses}</p>
          <p>Текст отзыва: {review.comment.commentText}</p>
          <p>Рейтинг: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
