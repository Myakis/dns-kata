import React from 'react';
import styles from './review.module.scss';
import StarRating from '../../../../shared/starRating';
import { UserProfile } from './userProfile';
import { IReview } from 'widgets/reviews/components/review/types';
import clsx from 'clsx';

interface ReviewProps {
  reviews: IReview[];
  loading: boolean;
  selectedStars: number[];
  filteredCurrentReviews: IReview[];
}

const renderReview = (review: IReview) => (
  <div className={clsx(styles.owOpinion, styles.owOpinions__item)} key={review.id}>
    <div className={styles.owOpinion__header}>
      <div className={styles.owOpinion__headerTop}>
        <div className={styles.owOpinion__headerLeft}>
          <div className={styles.profileInfo}>
            <div className={styles.profileInfo__user}>
              <div className={styles.profileInfo__avatarWrapper}>
                <div className={styles.profileInfo__avatarWrapper}>
                  <div className={styles.profileInfo__avatar} data-show-after-load=''>
                    <img
                      alt=''
                      className={styles.loaded}
                      src='https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png'
                    />
                  </div>
                  <div className={styles.profileInfo__level}>
                    <UserProfile />
                  </div>
                </div>
              </div>
              <div className={styles.profileInfo__userData}>
                <div className={styles.profileInfo__name}> {review.id} </div>
              </div>
            </div>
          </div>
          <div className={styles.profileInfo__activity}>
            <div className={styles.owOpinion__dateSite}>
              <span className={styles.owOpinion__date}>19.04.2024</span>
              <span className={styles.owOpinion__site}>Dns-shop.ru</span>
            </div>
            <div className={styles.owOpinion__report}></div>
            <div className={clsx(styles.profileInfo__status, styles.profileInfo__status_hidden)}></div>
          </div>
        </div>
        <div className={styles.owOpinion__headerRight}>
          <div className={styles.owOpinion__dateSite}>
            <div className={styles.owOpinionMobile__userRatings}>
              <div className={styles.opinionRatingSlider}>
                <div className={styles.opinionRatingSlider__tab}>
                  <div className={styles.opinionRatingSlider__tabTitle}>
                    <span>
                      <div className={styles.starRating}>
                        <div className={styles.starRating__stars}>
                          <div className={styles.starRating__star}>
                            <StarRating reviews={review.rating} />
                          </div>
                        </div>
                      </div>
                    </span>
                    <span className={styles.opinionRatingSlider__tabTitle_name}>Общая: </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.owOpinion__texts}>
      <div className={styles.owOpinion__text}>
        <div className={styles.owOpinion__textTitle}>Достоинства</div>
        <div className={styles.owOpinion__textDesc}>
          <p>{review.comment.pluses}</p>
        </div>
      </div>
      <div className={styles.owOpinion__text}>
        <div className={styles.owOpinion__textTitle}>Недостатки</div>
        <div className={styles.owOpinion__textDesc}>
          <p>{review.comment.minuses}</p>
        </div>
      </div>
      <div className={styles.owOpinion__text}>
        <div className={styles.owOpinion__textTitle}>Комментарий</div>
        <div className={styles.owOpinion__textDesc}>
          <p>{review.comment.commentText}</p>
        </div>
      </div>
      <div data-role='additionsWrapper'></div>
    </div>
  </div>
);

const Review: React.FC<ReviewProps> = ({ reviews, loading, selectedStars, filteredCurrentReviews }) => {
  // Если происходит загрузка, отображается сообщение о загрузке
  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  return (
    // Отображение списка отзывов
    <div className={clsx(styles.owOpinions, styles.opinionsWidget__opinions)}>
      {/* Если не выбраны звезды рейтинга, отображаются все отзывы, иначе - отфильтрованные */}
      {
        selectedStars.length === 0
          ? reviews.map((review) => renderReview(review)) // Отображение всех отзывов
          : filteredCurrentReviews.map((review) => renderReview(review)) // Отображение отфильтрованных отзывов
      }
    </div>
  );
};

export default Review;
