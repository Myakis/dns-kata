import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';

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
              1644
            </span>
          </div>
          <div className='ow-filters__count-filter-btn'>
            Только к этой модели{' '}
            <span className='ow-filters__count-filter-btn-count' data-role='btn-count'>
              152
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
        <div className='ow-filters__rating ui-checkbox-group' data-role='filter-rating'>
          <label className='ui-checkbox ow-filters__rating-item'>
            <span>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <div className='ow-filters__rating-item_count'>1 486</div>
            </span>
            <input type='checkbox' className='ui-checkbox__input' name='grade' value='5' />
            <span className='ui-checkbox__box'></span>
          </label>
          <label className='ui-checkbox ow-filters__rating-item'>
            <span>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <div className='ow-filters__rating-item_count'>77</div>
            </span>
            <input type='checkbox' className='ui-checkbox__input' name='grade' value='4' />
            <span className='ui-checkbox__box'></span>
          </label>
          <label className='ui-checkbox ow-filters__rating-item'>
            <span>
              <i></i>
              <i></i>
              <i></i>
              <div className='ow-filters__rating-item_count'>31</div>
            </span>
            <input type='checkbox' className='ui-checkbox__input' name='grade' value='3' />
            <span className='ui-checkbox__box'></span>
          </label>
          <label className='ui-checkbox ow-filters__rating-item'>
            <span>
              <i></i>
              <i></i>
              <div className='ow-filters__rating-item_count'>9</div>
            </span>
            <input type='checkbox' className='ui-checkbox__input' name='grade' value='2' />
            <span className='ui-checkbox__box'></span>
          </label>
          <label className='ui-checkbox ow-filters__rating-item'>
            <span>
              <i></i>
              <div className='ow-filters__rating-item_count'>41</div>
            </span>
            <input type='checkbox' className='ui-checkbox__input' name='grade' value='1' />
            <span className='ui-checkbox__box'></span>
          </label>
        </div>
        <div id='bottom-opinions-filters' style={{ visibility: 'hidden' }}></div>
      </div>
      <div className='ow-opinions opinions-widget__opinions'>
        {reviews.map((review) => (
          <div className='ow-opinion ow-opinions__item' key={review.id}>
            <div className='ow-opinion__header'>
              <div className='ow-opinion__header-top'>
                <div className='ow-opinion__header-left'>
                  <div className='profile-info'>
                    <div className='profile-info__user'>
                      <div className='profile-info__avatar-wrapper'>
                        <div className='profile-info__avatar-wrapper'>
                          <div className='profile-info__avatar' data-show-after-load=''>
                            <img
                              alt=''
                              data-src='https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png'
                              className='loaded'
                              src='https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png'
                              data-was-processed='true'
                            />
                          </div>
                          <div className='profile-info__level'>
                            <svg
                              width='46'
                              height='46'
                              viewBox='0 0 46 46'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                      <div className='profile-info__user-data'>
                        <div
                          className='profile-info__name '
                          data-user-popover=''
                          data-user-popover-url='/uniformProfile/personal/get-user-popover-content/?userId=ebcfb11d-432c-f693-8498-889af518ca11'
                          data-user-popover-inited='true'
                        >
                          {' '}
                          АндрейКар{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='profile-info__activity'>
                    <div className='ow-opinion__date-site'>
                      <span className='ow-opinion__date'>19.04.2024</span>
                      <span className='ow-opinion__site'>Dns-shop.ru</span>
                    </div>
                    <div className='ow-opinion__report' data-original-title='null' data-inited=''></div>
                    <div
                      className='profile-info__status profile-info__status_hidden'
                      data-status=''
                      data-initialized='true'
                    ></div>
                  </div>
                </div>
                <div className='ow-opinion__header-right'>
                  <div className='ow-opinion__rating'>
                    <div id='sr-YvHMMm' className='star-rating'>
                      <div className='star-rating__stars'>
                        <span className='star-rating__star' data-state='selected'>
                          <svg
                            width='22px'
                            height='21px'
                            viewBox='0 0 22 21'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                              <path
                                d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                fill='#000000'
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className='star-rating__star' data-state='selected'>
                          <svg
                            width='22px'
                            height='21px'
                            viewBox='0 0 22 21'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                              <path
                                d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                fill='#000000'
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className='star-rating__star' data-state='selected'>
                          <svg
                            width='22px'
                            height='21px'
                            viewBox='0 0 22 21'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                              <path
                                d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                fill='#000000'
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className='star-rating__star' data-state='selected'>
                          <svg
                            width='22px'
                            height='21px'
                            viewBox='0 0 22 21'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                              <path
                                d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                fill='#000000'
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className='star-rating__star' data-state='selected'>
                          <svg
                            width='22px'
                            height='21px'
                            viewBox='0 0 22 21'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
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
                  <div className='ow-opinion__date-site'>
                    <div className='ow-opinion-mobile__user-ratings'>
                      <div className='opinion-rating-slider'>
                        <div className='opinion-rating-slider__tab'>
                          <div className='opinion-rating-slider__tab-title'>
                            <span>
                              <div id='sr-St-Vex' className='star-rating'>
                                <div className='star-rating__stars'>
                                  <span className='star-rating__star' data-state='selected'>
                                    <svg
                                      width='22px'
                                      height='21px'
                                      viewBox='0 0 22 21'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                        <path
                                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                          fill='#000000'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span className='star-rating__star' data-state='selected'>
                                    <svg
                                      width='22px'
                                      height='21px'
                                      viewBox='0 0 22 21'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                        <path
                                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                          fill='#000000'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span className='star-rating__star' data-state='selected'>
                                    <svg
                                      width='22px'
                                      height='21px'
                                      viewBox='0 0 22 21'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                        <path
                                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                          fill='#000000'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span className='star-rating__star' data-state='selected'>
                                    <svg
                                      width='22px'
                                      height='21px'
                                      viewBox='0 0 22 21'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                        <path
                                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                          fill='#000000'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span className='star-rating__star' data-state='selected'>
                                    <svg
                                      width='22px'
                                      height='21px'
                                      viewBox='0 0 22 21'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                        <path
                                          d='M11,17.1483333 L16.1810004,20.2753773 C16.6538365,20.5607621 17.268496,20.4088029 17.5538808,19.9359669 C17.6885693,19.7128101 17.7308035,19.4458833 17.6715868,19.1920461 L16.2966667,13.2983333 L20.8752723,9.3318856 C21.2927035,8.9702648 21.3379468,8.3387183 20.9763259,7.9212871 C20.8056446,7.7242638 20.5647759,7.6016755 20.3050362,7.5796391 L14.2783333,7.0683333 L11.9207179,1.50570331 C11.7052005,0.99720486 11.1182696,0.75969683 10.6097711,0.97521427 C10.3707977,1.07649865 10.1805665,1.26672985 10.0792821,1.50570331 L7.7216667,7.0683333 L1.69496379,7.5796391 C1.144656,7.6263273 0.73639162,8.1102881 0.78307976,8.6605959 C0.80511609,8.9203356 0.92770441,9.1612042 1.12472773,9.3318856 L5.70333333,13.2983333 L4.32841315,19.1920461 C4.20294189,19.7298893 4.53723546,20.267612 5.07507876,20.3930833 C5.32891596,20.4523 5.5958428,20.4100658 5.81899958,20.2753773 L11,17.1483333 Z'
                                          fill='#000000'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </span>
                            <span className='opinion-rating-slider__tab-title_name'>Общая: </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='ow-opinion__texts'>
              <div className='ow-opinion__text'>
                <div className='ow-opinion__text-title'>Достоинства</div>
                <div className='ow-opinion__text-desc'>
                  <p>{review.comment.pluses}</p>
                </div>
              </div>
              <div className='ow-opinion__text'>
                <div className='ow-opinion__text-title'>Недостатки</div>
                <div className='ow-opinion__text-desc'>
                  <p>{review.comment.minuses}</p>
                </div>
              </div>
              <div className='ow-opinion__text'>
                <div className='ow-opinion__text-title'>Комментарий</div>
                <div className='ow-opinion__text-desc'>
                  <p>{review.comment.commentText}</p>
                </div>
              </div>
              <div data-role='additions-wrapper'></div>
            </div>
          </div>
        ))}
      </div>
      <div className='opinions-widget__pagination'>
        <div className='paginator-widget'>
          <div className='paginator-widget__block  paginator-widget__block_above' style={{ display: 'flex' }}>
            <a className='paginator-widget__more'>
              Показать ещё
            </a>
          </div>

          <div className='paginator-widget__block'>
            <div className='paginator-widget__pages'>
              <a className='paginator-widget__page paginator-widget__page_first'></a>
              <a className='paginator-widget__page paginator-widget__page_prev'></a>
              <a className='paginator-widget__page paginator-widget__page_active'>1</a>
              <a className='paginator-widget__page'>2</a>
              <a className='paginator-widget__page'>3</a>
              <a className='paginator-widget__page'>4</a>
              <a className='paginator-widget__page'>5</a>
              <a className='paginator-widget__page'>6</a>
              <a className='paginator-widget__page'>7</a>
              <a className='paginator-widget__page'>8</a>
              <a className='paginator-widget__page paginator-widget__page_next'></a>
              <a className='paginator-widget__page paginator-widget__page_last'></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
