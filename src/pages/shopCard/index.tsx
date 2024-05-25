import { FC, useRef, useState } from 'react';
import './shopCard.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetShopsQuery } from 'shared/api/DNS';
import Layout from 'pages/layout';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';

interface ShopImage {
  id: number;
  url: string;
}

const ShopCard: FC = () => {
  const { data: shops, isLoading } = useGetShopsQuery('');
  const navigate = useNavigate();

  // Массив с URL-адресами фотографий
  const shopImages: ShopImage[] = [
    { id: 1, url: '/public/img/shopCard/1.jpg' },
    { id: 2, url: '/public/img/shopCard/2.jpg' },
    { id: 3, url: '/public/img/shopCard/3.jpg' },
    { id: 4, url: '/public/img/shopCard/4.jpg' },
    { id: 5, url: '/public/img/shopCard/5.jpg' },
    { id: 6, url: '/public/img/shopCard/6.jpg' },
    { id: 7, url: '/public/img/shopCard/7.jpg' },
    { id: 8, url: '/public/img/shopCard/8.jpg' },
    { id: 9, url: '/public/img/shopCard/9.jpg' },
    { id: 10, url: '/public/img/shopCard/10.jpg' },
    { id: 11, url: '/public/img/shopCard/11.jpg' },
    { id: 12, url: '/public/img/shopCard/12.jpg' },
    { id: 13, url: '/public/img/shopCard/13.jpg' },
    { id: 14, url: '/public/img/shopCard/14.jpg' },
  ];

  const [next, setNext] = useState(0); // Состояние для кнопки слайдера
  const totalSlides = shopImages.length; // Общее количество слайдов
  const [sliderLength, setSliderLength] = useState(totalSlides * 150);
  const initialSliderLength = useRef(sliderLength);
  // State для отслеживания полноэкранного режима
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Функция для переключения между режимами слайдера и полноэкранного режима
  const toggleFullscreenMode = (id) => {
    setFullscreenMode(!fullscreenMode);
    setImageIndex(id - 1);
  };

  const moveSlidesRight = () => {
    setNext((prev) => prev - 150);
    setSliderLength((prev) => prev - 150);
  };

  const moveSlidesLeft = () => {
    setNext((prev) => prev + 150);
    setSliderLength((prev) => prev + 150);
  };

  // Функция для получения query параметров из URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);

    return {
      latitude: searchParams.get('latitude'),
      longitude: searchParams.get('longitude'),
    };
  };
  const { id } = useParams();
  const { latitude, longitude } = getQueryParams();

  const searchByIdShops = (shops?: IShop[]): IShop | undefined => {
    if (!shops) {
      return;
    }
    return shops.find((item) => item.id === Number(id));
  };

  const article = searchByIdShops(shops);

  if (isLoading) {
    // Если новости загружаются, отображаем сообщение
    return <div className='page--warning'>Загружаем...</div>;
  }
  if (!article) {
    // Если новость не найдена, перенаправляем на страницу ошибки
    navigate('*');
    return;
  }

  // Функция для генерации элемента слайдера с изображением
  const generateShopImageSliderItem = (image: ShopImage) => {
    return (
      <div
        key={image.id}
        className='shop-image-slider__item tns-item tns-slide-active'
        id={`tns1-item${image.id}`}
        onClick={() => toggleFullscreenMode(image.id)}
      >
        <img src={image.url} alt='' title='' />
      </div>
    );
  };

  // Функция для генерации элемента слайдера с изображением
  const generaTnsItem = (image: ShopImage) => {
    return (
      <div
        key={image.id}
        className='tns-item tns-slide-active'
        id={`tns8-item${image.id}`}
        onClick={() => chooseImage(image.id)}
      >
        <picture
          className={`media-viewer-image__slider-item media-viewer-slider__item ${
            image.id === imageIndex + 1 ? 'media-viewer-slider__item_active' : ''
          }`}
        >
          <img className='media-viewer-image__slider-img' src={image.url} alt='' title='' />
        </picture>
      </div>
    );
  };

  const chooseImage = (item) => {
    setImageIndex(item - 1);
  };

  // Функция для переключения на следующий элемент слайдера
  const stepRight = () => {
    // Добавляем класс загрузки
    const mainImg = document.querySelector('.media-viewer-image__main-img');

    mainImg.classList.add('media-viewer-image__main-img__loading');

    // Через 1 секунду удаляем класс загрузки
    setTimeout(() => {
      mainImg.classList.remove('media-viewer-image__main-img__loading');

      // Переключаем на следующее изображение
      imageIndex === totalSlides - 1 ? setImageIndex(0) : setImageIndex((prev) => prev + 1);
    }, 500);
  };

  // Функция для переключения на предыдущий элемент слайдера
  const stepLeft = () => {
    // Добавляем класс загрузки
    const mainImg = document.querySelector('.media-viewer-image__main-img');

    mainImg.classList.add('media-viewer-image__main-img__loading');

    // Через 1 секунду удаляем класс загрузки
    setTimeout(() => {
      mainImg.classList.remove('media-viewer-image__main-img__loading');

      // Если imageIndex равен 0, переключаемся на последний слайд
      if (imageIndex === 0) {
        setImageIndex(totalSlides - 1);
      } else {
        // Иначе уменьшаем imageIndex на 1
        setImageIndex((prev) => prev - 1);
      }
    }, 500);
  };

  console.log('totalSlides:', totalSlides);
  console.log('imageIndex:', imageIndex);

  return (
    <div>
      {fullscreenMode ? (
        // Полноэкранный режим
        <div class='media-viewer'>
          <div class='media-viewer__head'>
            <div class='media-viewer__head-text'>Магнитогорск - {article.name}</div>
            <i class='media-viewer__close' onClick={toggleFullscreenMode}></i>
          </div>
          <div class='media-viewer__titles'>
            <div class='media-viewer__title media-viewer__title_active'>Фото {totalSlides}</div>
          </div>
          <div class='media-viewer__content'>
            <div class='media-viewer-image'>
              <div class='media-viewer-image__main'>
                <div class='media-viewer-image__control media-viewer-image__control_left' onClick={stepLeft}></div>
                <div class='media-viewer-image__control media-viewer-image__control_right' onClick={stepRight}></div>
                <picture class='media-viewer-image__img-wrap'>
                  <img
                    class='media-viewer-image__main-img'
                    style={{ transform: 'none' }}
                    src={shopImages[imageIndex].url}
                  />
                </picture>
              </div>
              <div class='media-viewer-slider media-viewer-image__slider'>
                <div class='tns-outer' id='tns8-ow'>
                  <div class='tns-controls' aria-label='Carousel Navigation' tabindex='0' style={{ display: 'none' }}>
                    <button type='button' data-controls='prev' tabindex='-1' aria-controls='tns8'>
                      <div class='media-viewer-slider__arrow media-viewer-slider__arrow_left'>
                        <i></i>
                      </div>
                    </button>
                    <button type='button' data-controls='next' tabindex='-1' aria-controls='tns8'>
                      <div class='media-viewer-slider__arrow media-viewer-slider__arrow_right'>
                        <i></i>
                      </div>
                    </button>
                  </div>
                  <div class='tns-liveregion tns-visually-hidden' aria-live='polite' aria-atomic='true'>
                    slide <span class='current'>1 to 17</span> of 17
                  </div>
                  <div id='tns8-mw' class='tns-ovh'>
                    <div class='tns-inner' id='tns8-iw'>
                      <div
                        class='media-viewer-slider__wrap  tns-slider tns-carousel tns-subpixel tns-calc tns-autowidth tns-horizontal'
                        id='tns8'
                        style={{ transitionDuration: '0.3s', transform: 'translate3d(px, 0px, 0px)' }}
                      >
                        {shopImages.map((image) => generaTnsItem(image))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Обычный режим со слайдером
        <Layout pageTitle={article.name || null} breadcrumbs={'Главная'}>
          <article>
            <div class='container'>
              <div class='shop-page'>
                <div class='shops-page-city-select'>
                  <div class='shops-page-city-select'>Ваш город:</div>
                  <div class='shops-page-city-select__wrapper'>
                    <div class='city-select-widget__wrapper'>
                      <div class='city-select-widget__city-name'>Магнитогорск </div>
                    </div>
                  </div>
                </div>
                <div class='shop-page-content'>
                  <div class='shop-page-content__map '>
                    <div class='ya-map-container'>
                      <iframe
                        title='y-map'
                        src={`https://yandex.ru/map-widget/v1/?ll=${latitude}%2C${longitude}&z=12&pt=${latitude}%2C${longitude}`}
                        width='100%'
                        height='230px'
                        frameBorder='0'
                      ></iframe>
                    </div>
                  </div>
                  <div class='shop-page-content__photo-slider shop-image-slider'>
                    <div class='tns-outer'>
                      <div class='tns-controls' aria-label='Carousel Navigation' tabindex='0'>
                        <button
                          type='button'
                          data-controls='prev'
                          tabindex='-1'
                          aria-controls='tns1'
                          onClick={() => moveSlidesLeft()}
                          style={
                            sliderLength !== initialSliderLength.current ? { display: 'initial' } : { display: 'none' }
                          }
                        >
                          prev
                        </button>
                        <button
                          type='button'
                          data-controls='next'
                          tabindex='-1'
                          aria-controls='tns1'
                          onClick={() => moveSlidesRight()}
                          style={sliderLength === 1650 ? { display: 'none' } : { display: 'initial' }}
                        >
                          next
                        </button>
                      </div>
                      <div class='tns-liveregion tns-visually-hidden' aria-live='polite' aria-atomic='true'>
                        slide <span class='current'>1 to 12</span> of 45
                      </div>
                      <div id='tns1-mw' class='tns-ovh'>
                        <div class='tns-inner' id='tns1-iw'>
                          <div
                            data-role='slider'
                            class='  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal'
                            id='tns1'
                            style={{ transitionDuration: '0.3s', transform: `translate3d(${next}px, 0px, 0px)` }}
                          >
                            {shopImages.map((image) => generateShopImageSliderItem(image))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='shop-page-content__section' itemscope='' itemtype='http://schema.org/Place'>
                    <meta itemprop='name' content='Цифровой супермаркет DNS Москва DNS Мега Белая Дача' />
                    <div class='shop-page-content__container'>
                      <div class='shop-page-content__info-block'>
                        <div class='shop-page-content__main-info'>
                          <div itemprop='address' itemscope='' itemtype='http://schema.org/PostalAddress'>
                            <meta itemprop='addressLocality' content='Москва' />
                            <div
                              class='shop-page-content__text_larger shop-page-content__text_bold'
                              itemprop='streetAddress'
                            >
                              {article.streetAddress}{' '}
                            </div>
                          </div>
                          <div class='shop-page-content__text_small shop-page-content__text_small-offset'>
                            {article.description}{' '}
                          </div>
                          <span class='shop-page-content__text_small'>
                            <div class='shop-work-time'>
                              <span class='shop-work-time__text-group'>Пн-Вт с 10:00 до 22:00</span>
                              <span class='shop-work-time__dot-icon'></span>
                              <span class='shop-work-time__text-group'>Ср-Вс с 10:00 до 23:00</span>
                              <br />
                            </div>
                          </span>
                          <span class='shop-page-content__text_gray shop-page-content__text_small'>
                            <span class='shop-page-content__open-status '>
                              {article.inOpen ? 'Открыто' : 'Закрыто'}
                            </span>
                          </span>
                          <div class='shop-page-content__voblers'>
                            <div
                              class='shop-vobler'
                              data-role='shop-vobler'
                              data-info='В магазине могут изготовить пленку для защиты экрана вашего устройства'
                              data-url='/specialization/hydrogel/'
                            >
                              <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  clip-rule='evenodd'
                                  d='M15.2134 0.714844C17.5496 0.714844 19.4434 2.60863 19.4434 4.94484L19.4434 15.2135C19.4434 17.5497 17.5496 19.4435 15.2134 19.4435L8.61869 19.4435C8.41976 19.4435 8.22898 19.3645 8.08832 19.2238L0.861931 11.9964C0.712424 11.8593 0.618692 11.6624 0.618692 11.4435C0.618692 11.4304 0.619028 11.4174 0.619694 11.4044L0.619694 4.94484C0.619694 2.60863 2.51348 0.714843 4.84969 0.714843L15.2134 0.714844ZM3.18018 12.1935L7.86869 16.8827L7.86869 14.4435C7.86869 13.2007 6.86148 12.1935 5.61869 12.1935L3.18018 12.1935ZM9.36869 17.9435L9.36869 14.4435C9.36869 12.3723 7.68991 10.6935 5.61869 10.6935L2.11969 10.6935L2.11969 4.94484C2.11969 3.43706 3.34191 2.21484 4.84969 2.21484L15.2134 2.21484C16.7211 2.21484 17.9434 3.43706 17.9434 4.94484L17.9434 15.2135C17.9434 16.7213 16.7211 17.9435 15.2134 17.9435L9.36869 17.9435Z'
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div class='shop-page-content__contacts'>
                          <div class='shop-page-content__contacts-title'>Телефон</div>
                          <div class='shop-page-content__main-phone' itemprop='telephone'>
                            +7 (499) 704-46-40; +7 (499) 285-00-53
                          </div>
                          <div class='shop-page-content__text-to-manager'>
                            <a class='ui-link ui-link_blue' href='javascript:' data-role='to-feedback-block'>
                              Написать управляющему магазина
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='shop-page-content__favorite-shop-checkbox'>
                        <div id='id2GlHnr'>
                          <label class='ui-checkbox shop-page-content__checkbox-content'>
                            <span>Добавить в избранные магазины</span>
                            <input
                              type='checkbox'
                              class='ui-checkbox__input'
                              data-role='set-default-shop-chbx'
                              data-save-url='/shops/save-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e&amp;source=2'
                              data-remove-url='/shops/remove-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e'
                            />
                            <span class='ui-checkbox__box'></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div itemprop='geo' itemscope='' itemtype='http://schema.org/GeoCoordinates'>
                      <meta itemprop='longitude' content='37.846731' />
                      <meta itemprop='latitude' content='55.658328' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Layout>
      )}
    </div>
  );
};

export default ShopCard;
