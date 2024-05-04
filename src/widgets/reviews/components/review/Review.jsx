import React from 'react';
import PropTypes from 'prop-types';
import styles from './review.module.scss';
import StarRating from '../../../../shared/starRating';

const Review = ({ reviews, loading, selectedStars }) => {
  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  const renderReview = (review) => (
    <div className={`${styles.owOpinion} ${styles.owOpinions__item}`} key={review.id}>
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
                        data-src='https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png'
                        className={styles.loaded}
                        src='https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png'
                        data-was-processed='true'
                      />
                    </div>
                    <div className={styles.profileInfo__level}>
                      <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill='#ddd'
                          d='M24 0V2.00204C27.8746 2.18368 31.4746 3.41533 34.5218 5.41884L35.6987 3.79902C32.3195 1.55719 28.3136 0.184532 24 0Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M36.1719 6.62223C39.0553 8.94719 41.3113 12.019 42.6459 15.5438L44.5505 14.9249C43.0764 10.982 40.5511 7.55205 37.3158 4.97588L36.7536 5.74965L36.1719 6.62223Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M44 22.9787C44 24.8935 43.7437 26.7484 43.2636 28.5111L45.1682 29.1299C45.7103 27.172 46 25.1091 46 22.9787C46 20.8481 45.7103 18.7852 45.1682 16.8271L43.2635 17.446C43.7437 19.2087 44 21.0638 44 22.9787Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M42.646 30.4133C41.3063 33.9516 39.0382 37.0334 36.139 39.3615L37.3159 40.9813C40.5512 38.4051 43.0765 34.9751 44.5506 31.0322L42.646 30.4133Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M34.5219 40.5384C31.4746 42.5419 27.8746 43.7736 24 43.9553V45.9573C28.3137 45.7728 32.3196 44.4001 35.6988 42.1582L34.5219 40.5384Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M22 43.9553C18.1254 43.7736 14.5254 42.542 11.4781 40.5384L10.3012 42.1582C13.6805 44.4001 17.6864 45.7728 22 45.9573V43.9553Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M9.861 39.3615C6.96184 37.0334 4.69376 33.9516 3.35407 30.4134L1.44945 31.0323C2.92358 34.9752 5.44879 38.4052 8.68413 40.9813L9.861 39.3615Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M2 22.9787C2 21.0638 2.2563 19.2087 2.73646 17.446L0.831849 16.8271C0.289697 18.7852 0 20.8481 0 22.9787C0 25.1091 0.289675 27.172 0.831787 29.1299L2.7364 28.5111C2.25628 26.7484 2 24.8935 2 22.9787Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M3.35411 15.5438C4.69383 12.0056 6.96192 8.92379 9.86111 6.5957L8.68424 4.97588C5.44888 7.55205 2.92365 10.982 1.44949 14.9249L3.35411 15.5438Z'
                        ></path>
                        <path
                          fill='#ddd'
                          d='M10.3013 3.79901C13.6805 1.55718 17.6864 0.184532 22 0V2.00204C18.1254 2.18368 14.5255 3.41532 11.4782 5.41883L10.3013 3.79901Z'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.profileInfo__userData}>
                  <div
                    className={styles.profileInfo__name}
                    data-user-popover=''
                    data-user-popover-url='/uniformProfile/personal/get-user-popover-content/?userId=ebcfb11d-432c-f693-8498-889af518ca11'
                    data-user-popover-inited='true'
                  >
                    {' '}
                    {review.id}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.profileInfo__activity}>
              <div className={styles.owOpinion__dateSite}>
                <span className={styles.owOpinion__date}>19.04.2024</span>
                <span className={styles.owOpinion__site}>Dns-shop.ru</span>
              </div>
              <div className={styles.owOpinion__report} data-original-title='null' data-inited=''></div>
              <div
                className={`${styles.profileInfo__status} ${styles.profileInfo__status_hidden}`}
                data-status=''
                data-initialized='true'
              ></div>
            </div>
          </div>
          <div className={styles.owOpinion__headerRight}>
            <div className={styles.owOpinion__rating}>
              <div id='sr-YvHMMm' className={styles.starRating}>
                <div className={styles.starRating__stars}>
                  <span className={styles.starRating__star} data-state='selected'>
                    <svg
                      width='22px'
                      height='21px'
                      viewBox='0 0 22 21'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g stroke='none' fill='none'>
                        <path
                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                          fill='#000000'
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className={styles.starRating__star} data-state='selected'>
                    <svg
                      width='22px'
                      height='21px'
                      viewBox='0 0 22 21'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g stroke='none' fill='none'>
                        <path
                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                          fill='#000000'
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className={styles.starRating__star} data-state='selected'>
                    <svg
                      width='22px'
                      height='21px'
                      viewBox='0 0 22 21'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g stroke='none' fill='none'>
                        <path
                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                          fill='#000000'
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className={styles.starRating__star} data-state='selected'>
                    <svg
                      width='22px'
                      height='21px'
                      viewBox='0 0 22 21'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g stroke='none' fill='none'>
                        <path
                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                          fill='#000000'
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className={styles.starRating__star} data-state='selected'>
                    <svg
                      width='22px'
                      height='21px'
                      viewBox='0 0 22 21'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g stroke='none' fill='none'>
                        <path
                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                          fill='#000000'
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.owOpinion__dateSite}>
              <div className={styles.owOpinionMobile__userRatings}>
                <div className={styles.opinionRatingSlider}>
                  <div className={styles.opinionRatingSlider__tab}>
                    <div className={styles.opinionRatingSlider__tabTitle}>
                      <span>
                        <div id='sr-St-Vex' className={styles.starRating}>
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

  const filteredReviews = reviews.filter((review) => selectedStars.includes(review.rating));

  return (
    <div className={`${styles.owOpinions} ${styles.opinionsWidget__opinions}`}>
      {selectedStars.length === 0
        ? reviews.map((review) => renderReview(review))
        : filteredReviews.map((review) => renderReview(review))}
    </div>
  );
};

Review.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  selectedStars: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Review;
