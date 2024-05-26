import { FC, useRef, useState, useEffect } from 'react';
import styles from './shopCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetShopsQuery } from 'shared/api/DNS';
import Layout from 'pages/layout';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
import clsx from 'clsx';

interface ShopImage {
  id: number;
  url: string;
}

interface Bank {
  name: string;
}

// Данные для списка
const banks: Bank[] = [
  { name: 'КБ "Ренессанс Кредит" (ООО)' },
  { name: 'ПАО "Совкомбанк"' },
  { name: 'ПАО "Сбербанк"' },
  { name: 'АО «Банк Русский Стандарт»' },
  { name: 'ООО "ХКФ Банк"' },
  { name: 'АО "ОТП Банк"' },
  { name: 'АО «Почта Банк»' },
  { name: 'ПАО «МТС-Банк»' },
  { name: 'Тинькофф Банк, АО' },
  { name: 'АО «КРЕДИТ ЕВРОПА БАНК (Россия)»' },
];

// Функция для рендеринга элемента списка
const renderBankItem = (bank: Bank, index: number) => (
  <li key={index} className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
    <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='!#'>
      {bank.name}
    </a>
  </li>
);

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
  const [sliderLengthFullscreen, setSliderLengthFullscreen] = useState(totalSlides * 82);
  const initialSliderLength = useRef(sliderLength);
  const initialSliderLengthFullscreen = useRef(sliderLengthFullscreen);
  // State для отслеживания полноэкранного режима
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [nextFullscreen, setNextFullscreen] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!fullscreenMode) return;

      const tnsControls = document.querySelector('.tnsControls') as HTMLElement;

      if (tnsControls) {
        if (window.innerWidth >= sliderLengthFullscreen && nextFullscreen === 0) {
          tnsControls.style.display = 'none';
        } else {
          tnsControls.style.display = 'initial';
        }
      }
    };

    if (fullscreenMode) {
      window.addEventListener('resize', handleResize);
    } else {
      window.removeEventListener('resize', handleResize);
    }

    handleResize(); // Call initially in case we enter fullscreen mode

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fullscreenMode, sliderLengthFullscreen]);

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

  const moveSlidesRightFullscreen = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= sliderLengthFullscreen) {
      setNextFullscreen((prev) => prev - 82);
      setSliderLengthFullscreen((prev) => prev - 82);
    }
  };

  const moveSlidesLeftFullscreen = () => {
    if (sliderLengthFullscreen < initialSliderLengthFullscreen.current) {
      setNextFullscreen((prev) => prev + 82);
      setSliderLengthFullscreen((prev) => prev + 82);
    }
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
    return <div className={styles.pageWarning}>Загружаем...</div>;
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
        className={clsx(styles.shopImageSlider__item, styles.tnsItem, styles.tnsSlideActive)}
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
        className={clsx(styles.tnsItem, styles.tnsSlideActive)}
        id={`tns8-item${image.id}`}
        onClick={() => chooseImage(image.id)}
      >
        <picture
          className={clsx(styles.mediaViewerImage__sliderItem, styles.mediaViewerSlider__item, {
            [styles.mediaViewerSlider__item_active]: image.id === imageIndex + 1,
          })}
        >
          <img className={styles.mediaViewerImage__sliderImg} src={image.url} alt='' title='' />
        </picture>
      </div>
    );
  };

  const chooseImage = (item) => {
    setImageIndex(item - 1);
  };

  // Функция для переключения на следующий элемент слайдера

  const [isLoadingImage, setIsLoadingImage] = useState(false); // Состояние для отслеживания добавления класса загрузки к изображению

  const stepRight = () => {
    setIsLoadingImage(true); // Устанавливаем состояние, что изображение загружается

    setImageIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

    setTimeout(() => setIsLoadingImage(false), 500); // Сбрасываем состояние после изменения imageIndex
  };

  // Функция для переключения на предыдущий элемент слайдера
  const stepLeft = () => {
    setIsLoadingImage(true); // Устанавливаем состояние, что изображение загружается при переходе на предыдущее изображение

    // Если imageIndex равен 0, переключаемся на последний слайд
    if (imageIndex === 0) {
      setImageIndex(totalSlides - 1);
    } else {
      // Иначе уменьшаем imageIndex на 1
      setImageIndex((prev) => prev - 1);
    }

    setTimeout(() => setIsLoadingImage(false), 500); // Сбрасываем состояние после изменения imageIndex
  };

  console.log('totalSlides:', totalSlides);
  console.log('imageIndex:', imageIndex);

  return (
    <div>
      {fullscreenMode ? (
        // Полноэкранный режим
        <div className={styles.mediaViewer}>
          <div className={styles.mediaViewer__head}>
            <div className={styles.mediaViewer__headText}>Магнитогорск - {article.name}</div>
            <i className={styles.mediaViewer__close} onClick={toggleFullscreenMode}></i>
          </div>
          <div className={styles.mediaViewer__titles}>
            <div className={clsx(styles.mediaViewer__title, styles.mediaViewer__title_active)}>Фото {totalSlides}</div>
          </div>
          <div className={styles.mediaViewer__content}>
            <div className={styles.mediaViewerImage}>
              <div className={styles.mediaViewerImage__main}>
                <div
                  className={clsx(styles.mediaViewerImage__control, styles.mediaViewerImage__control_left)}
                  onClick={stepLeft}
                ></div>
                <div
                  className={clsx(styles.mediaViewerImage__control, styles.mediaViewerImage__control_right)}
                  onClick={stepRight}
                ></div>
                <picture className={styles.mediaViewerImage__imgWrap}>
                  <img
                    className={clsx(styles.mediaViewerImage__mainImg, {
                      [styles.mediaViewerImage__mainImg__loading]: isLoadingImage,
                    })}
                    style={{ transform: 'none' }}
                    src={shopImages[imageIndex].url}
                    alt='Фото отсутствует'
                  />
                </picture>
              </div>
              <div className={styles.mediaViewerImage__imageCounter}>2 из 45</div>
              <div className={clsx(styles.mediaViewerSlider, styles.mediaViewerImage__slider)}>
                <div className={styles.tnsOuter} id='tns8-ow'>
                  <div className={styles.tnsControls} aria-label='Carousel Navigation' style={{ display: 'none' }}>
                    <button type='button' data-controls='prev' aria-controls='tns8' onClick={moveSlidesLeftFullscreen}>
                      <div className={(styles.mediaViewerSlider__arrow, styles.mediaViewerSlider__arrow_left)}>
                        <i></i>
                      </div>
                    </button>
                    <button type='button' data-controls='next' aria-controls='tns8' onClick={moveSlidesRightFullscreen}>
                      <div className={clsx(styles.mediaViewerSlider__arrow, styles.mediaViewerSlider__arrow_right)}>
                        <i></i>
                      </div>
                    </button>
                  </div>
                  <div
                    className={clsx(styles.tnsLiveregion, styles.tnsVisuallyHidden)}
                    aria-live='polite'
                    aria-atomic='true'
                  >
                    slide <span className={styles.current}>1 to 12</span> of 45
                  </div>
                  <div id='tns8-mw' className={styles.tnsOvh}>
                    <div className={styles.tnsInner} id='tns8-iw'>
                      <div
                        className={clsx(
                          styles.mediaViewerSlider__wrap,
                          styles.tnsSlider,
                          styles.tnsSubpixel,
                          styles.tnsAutowidth,
                          styles.tnsHorizontal
                        )}
                        id='tns8'
                        style={{
                          transform: `translate3d(${nextFullscreen}px, 0px, 0px)`,
                          transition: 'transform 500ms ease 0s',
                        }}
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
            <div className={styles.container}>
              <div className={styles.shopPage}>
                <div className={styles.shopPageContent}>
                  <div className={styles.shopPageContent__map}>
                    <div className={styles.yaMapContainer}>
                      <iframe
                        title='y-map'
                        src={`https://yandex.ru/map-widget/v1/?ll=${latitude}%2C${longitude}&z=12&pt=${latitude}%2C${longitude}`}
                        width='100%'
                        height='230px'
                        frameBorder='0'
                      ></iframe>
                    </div>
                  </div>
                  <div className={clsx(styles.shopPageContent__photoSlider, styles.shopImageSlider)}>
                    <div className={styles.tnsOuter}>
                      <div className={styles.tnsControls} aria-label='Carousel Navigation'>
                        <button
                          type='button'
                          data-controls='prev'
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
                          aria-controls='tns1'
                          onClick={() => moveSlidesRight()}
                          style={sliderLength === 1650 ? { display: 'none' } : { display: 'initial' }}
                        >
                          next
                        </button>
                      </div>
                      <div
                        className={clsx(styles.tnsLiveregion, styles.tnsVisuallyHidden)}
                        aria-live='polite'
                        aria-atomic='true'
                      >
                        slide <span className={styles.current}>1 to 12</span> of 45
                      </div>
                      <div id='tns1-mw' className={styles.tnsOvh}>
                        <div className={styles.tnsInner} id='tns1-iw'>
                          <div
                            data-role='slider'
                            className={clsx(
                              styles.tnsSlider,
                              styles.tnsSubpixel,
                              styles.tnsHorizontal,
                              styles.tnsDefault
                            )}
                            id='tns1'
                            style={{ transitionDuration: '0.3s', transform: `translate3d(${next}px, 0px, 0px)` }}
                          >
                            {shopImages.map((image) => generateShopImageSliderItem(image))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopPageContent__section}>
                    <div className={styles.shopPageContent__container}>
                      <div className={styles.shopPageContent__infoBlock}>
                        <div className={styles.shopPageContent__mainInfo}>
                          <div itemprop='address'>
                            <div
                              className={clsx(styles.shopPageContent__textLarger, styles.shopPageContent__textBold)}
                              itemprop='streetAddress'
                            >
                              {article.streetAddress}{' '}
                            </div>
                          </div>
                          <div
                            className={clsx(
                              styles.shopPageContent__text_small,
                              styles.shopPageContent__text_smallOffset
                            )}
                          >
                            {article.description}{' '}
                          </div>
                          <span className={styles.shopPageContent__text_small}>
                            <div className={styles.shopWorkTime}>
                              <span className={styles.shopWorkTime__textGroup}>Пн-Вт с 10:00 до 22:00</span>
                              <span className={styles.shopWorkTime__dotIcon}></span>
                              <span className={styles.shopWorkTime__textGroup}>Ср-Вс с 10:00 до 23:00</span>
                              <br />
                            </div>
                          </span>
                          <span className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                            <span className={styles.shopPageContent__openStatus}>
                              {article.inOpen ? 'Открыто' : 'Закрыто'}
                            </span>
                          </span>
                          <div className={styles.shopPageContent__voblers}>
                            <div
                              className={styles.shopVobler}
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
                        <div className={styles.shopPageContent__contacts}>
                          <div className={styles.shopPageContent__contactsTitle}>Телефон</div>
                          <div className={styles.shopPageContent__mainPhone} itemprop='telephone'>
                            +7 (499) 704-46-40; +7 (499) 285-00-53
                          </div>
                          <div className={styles.shopPageContent__textToManager}>
                            <a
                              className={clsx(styles.uiLink, styles.uiLink_blue)}
                              href='!#'
                              data-role='to-feedback-block'
                            >
                              Написать управляющему магазина
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.shopPageContent__favoriteShopCheckbox}>
                        <div id='id2GlHnr'>
                          <label className={clsx(styles.uiCheckbox, styles.shopPageContent__checkboxContent)}>
                            <span>Добавить в избранные магазины</span>
                            <input
                              type='checkbox'
                              className={styles.uiCheckbox__input}
                              data-role='set-default-shop-chbx'
                              data-save-url='/shops/save-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e&amp;source=2'
                              data-remove-url='/shops/remove-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e'
                            />
                            <span className={styles.uiCheckbox__box}></span>
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
