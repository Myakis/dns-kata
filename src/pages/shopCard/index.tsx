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

      const tnsControls = document.querySelector(`.${styles.tnsControls}`) as HTMLElement;

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
                          styles.tnsFullscreen,
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
                  <a
                    className={clsx(styles.navigationLink, styles.uiLink, styles.uiLink_black)}
                    href='!#'
                    data-show-navigation-modal=''
                    data-latitude='55.658328'
                    data-longitude='37.846731'
                  >
                    Проложить маршрут{' '}
                    <span className={styles.navigationLink__icons}>
                      <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_yaNav)}></i>
                      <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_googleMap)}></i>
                      <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_2Gis)}></i>
                    </span>
                  </a>
                  <div className={styles.shopPageContent__section}>
                    <div className={styles.shopPageContent__addInfoBlocks}>
                      <div className={styles.shopPageContent__addInfoItem}>
                        <p className={styles.shopPageContent__textBold}>Способы покупки</p>
                        <ul>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            В магазине
                          </li>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            Через интернет
                          </li>
                        </ul>
                      </div>
                      <div className={styles.shopPageContent__addInfoItem}>
                        <p className={styles.shopPageContent__textBold}>Способы оплаты</p>
                        <ul>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            Подарочные карты
                          </li>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            Наличный расчёт
                          </li>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            Безналичный расчёт
                          </li>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            Mastercard
                          </li>
                          <li
                            className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}
                          >
                            VISA
                          </li>
                        </ul>
                      </div>
                      <div className={styles.shopPageContent__addInfoItem}>
                        <p className={styles.shopPageContent__textBold}>Способы получения</p>
                        <ul>
                          <li className={styles.shopPageContent__text_small}>
                            <span
                              className={clsx(
                                styles.shopPageContent__text_small,
                                styles.shopPageContent__text_darkGray
                              )}
                            >
                              Самовывоз{' '}
                            </span>
                          </li>
                          <li className={styles.shopPageContent__text_small}>
                            <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='/help/delivery/'>
                              Служба доставки
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.shopPageContent__addInfoItem}>
                        <p className={styles.shopPageContent__textBold}>Кредиты</p>
                        <ul>{banks.map(renderBankItem)}</ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopPageContent__section}>
                    <div
                      className={clsx(
                        styles.shopCorpInfoBlock__title,
                        styles.shopCorpInfoBlock__title_smallOffset,
                        styles.shopPageContent__title,
                        styles.shopPageContent__title_bold,
                        styles.shopPageContent__title_small
                      )}
                    >
                      Корпоративный отдел
                    </div>
                    <div id='corporate' className={styles.shopCorpInfoBlock} data-role='corp-info-container'>
                      <div className={styles.shopCorpInfoBlock__row}>
                        <div className={styles.shopWorkTime}>
                          <span className={styles.shopWorkTime__textGroup}>Пн-Вт с 10:00 до 22:00</span>
                          <span className={styles.shopWorkTime__dotIcon}></span>
                          <span className={styles.shopWorkTime__textGroup}>Ср-Вс с 10:00 до 23:00</span>
                          <br />
                        </div>
                        <span className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                          <span className={styles.shopPageContent__openStatus}>закрыто еще 3 ч. </span>
                        </span>
                      </div>
                      <div className={clsx(styles.shopCorpInfoBlock, styles.shopCorpInfoBlock__row)}>
                        <div
                          className={clsx(styles.shopCorpInfoBlock__title, styles.shopCorpInfoBlock__title_smallOffset)}
                        >
                          <div className={styles.shopPageContent__textBold}>Руководитель:</div>
                          Баландин Дмитрий Евгеньевич{' '}
                        </div>
                        <div className={styles.shopPageContent__text_small}>
                          <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                          +7(499)285 00 53{' '}
                        </div>
                        <div className={styles.shopPageContent__text_small}>
                          <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>E-mail: </span>
                          <a
                            className={clsx(styles.uiLink, styles.uiLink_blue)}
                            href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                          >
                            KotelnikiTRCMegaGiper@dns-shop.ru
                          </a>
                        </div>
                      </div>
                      <div className={clsx(styles.shopCorpInfoBlock__row, styles.shopCorpInfoBlock__row_withoutOffset)}>
                        <p
                          className={clsx(
                            styles.shopCorpInfoBlock__title,
                            styles.shopCorpInfoBlock__title_largeOffset,
                            styles.shopPageContent__textBold
                          )}
                        >
                          Специалисты по работе с юридическими лицами:
                        </p>
                        <div className={styles.shopCorpInfoBlock__manager}>
                          <div
                            className={clsx(
                              styles.shopCorpInfoBlock__title,
                              styles.shopCorpInfoBlock__title_smallOffset
                            )}
                          >
                            Пучкова Татьяна Ивановна
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                            +7(499)285 00 53{' '}
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>
                              E-mail:{' '}
                            </span>
                            <a
                              className={clsx(styles.uiLink, styles.uiLink_blue)}
                              href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                            >
                              KotelnikiTRCMegaGiper@dns-shop.ru
                            </a>
                          </div>
                        </div>
                        <div className={styles.shopCorpInfoBlock__manager}>
                          <div
                            className={clsx(
                              styles.shopCorpInfoBlock__title,
                              styles.shopCorpInfoBlock__title_smallOffset
                            )}
                          >
                            Фистунова Дарья Евгеньевна
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                            +7(499)285 00 53{' '}
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>
                              E-mail:{' '}
                            </span>
                            <a
                              className={clsx(styles.uiLink, styles.uiLink_blue)}
                              href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                            >
                              KotelnikiTRCMegaGiper@dns-shop.ru
                            </a>
                          </div>
                        </div>
                        <div className={styles.shopCorpInfoBlock__manager}>
                          <div
                            className={clsx(
                              styles.shopCorpInfoBlock__title,
                              styles.shopCorpInfoBlock__title_smallOffset
                            )}
                          >
                            Никифоров Виталий Всеволодович
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                            +7(499)285 00 53{' '}
                          </div>
                          <div className={styles.shopPageContent__text_small}>
                            <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>
                              E-mail:{' '}
                            </span>
                            <a
                              className={clsx(styles.uiLink, styles.uiLink_blue)}
                              href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                            >
                              KotelnikiTRCMegaGiper@dns-shop.ru
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.shopCorpInfoBlock__invoicePayment}>
                        <div className={styles.shopPageContent__text_smallOffset}>Проверка оплаты счета</div>
                        <form
                          id='f-check-invoice-payment'
                          action='/checkInvoicePayment/check/index/'
                          method='POST'
                          data-method='ajax'
                        >
                          <input
                            type='hidden'
                            name='_csrf'
                            value='r0hK4lx2f_BmqmUFGm3F1UYbqR0K98MIpqAL9q8JQozkLD-NGhUoryHgAF1cOby-AC7wUzy49Ebu0l-82nA15g=='
                          />
                          <div className={styles.checkInvoiceWidget}>
                            <input
                              type='text'
                              id='invoice'
                              className={styles.checkInvoiceWidget__input}
                              name='number'
                              placeholder='Например: РК1-000201'
                            />
                            <button
                              className={clsx(
                                styles.buttonUi,
                                styles.buttonUi_brand,
                                styles.buttonUi_md,
                                styles.checkInvoiceWidget__button
                              )}
                              type='submit'
                            >
                              Проверить
                            </button>
                            <div
                              id='b-check-invoice-payment-result'
                              className={styles.checkInvoiceWidget__result}
                            ></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopPageContent__section}>
                    <h2
                      className={clsx(
                        styles.shopPageContent__title,
                        styles.shopPageContent__title_bold,
                        styles.shopPageContent__title_small
                      )}
                    >
                      Реквизиты
                    </h2>
                    <div className={styles.shopRequisitesBlock}>
                      <div className={styles.shopRequisitesBlock__row}>
                        <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                          Название
                        </div>
                        <div>Филиал Центральный ООО "ДНС Ритейл"</div>
                      </div>
                      <div className={styles.shopRequisitesBlock__row}>
                        <div className={styles.shopRequisitesBlock__infoItem}>
                          <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                            Почтовый адрес
                          </div>
                          <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                        </div>
                        <div className={styles.shopRequisitesBlock__infoItem}>
                          <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                            Юридический адрес
                          </div>
                          <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                        </div>
                      </div>
                      <div className={styles.shopRequisitesBlock__row}>
                        <div className={styles.shopRequisitesBlock__infoItem}>
                          <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                            ИНН / КПП
                          </div>
                          <div>2540167061 / 772043001</div>
                        </div>
                        <div className={styles.shopRequisitesBlock__infoItem}>
                          <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                            ОГРН
                          </div>
                          <div>1102540008230</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopPageContent__section}>
                    <h2
                      className={clsx(
                        styles.shopPageContent__title,
                        styles.shopPageContent__title_bold,
                        styles.shopPageContent__title_small
                      )}
                    >
                      Обратная связь
                    </h2>
                    <div className={styles.shopFeedbackBlock}>
                      <a
                        className={styles.shopFeedbackBlock__spoilerBtn}
                        href='javascript:'
                        data-target='#shop-feedback-info-block'
                        data-toggle='collapse'
                        aria-expanded='false'
                      >
                        <span>Справочная информация</span>
                        <i></i>
                      </a>
                      <div
                        id='shop-feedback-info-block'
                        className={clsx(styles.shopFeedbackBlock__info, styles.collapse)}
                      >
                        <p className={styles.shopFeedbackBlock__textBold}>Уважаемые клиенты!</p>
                        <p className={styles.shopFeedbackBlock__textBold}>
                          В целях оперативного рассмотрения ваших обращений просим максимально точно изложить суть
                          вопроса и имеющиеся факты.
                        </p>
                        <p className={styles.shopFeedbackBlock__text_small}>
                          1. Адрес магазина и/или сервисного центра;
                          <br />
                          2. Время описываемых событий;
                          <br />
                          3. Имена и/или фамилии сотрудников компании;
                          <br />
                          4. Номер оформленного заказа на покупку товара;
                          <br />
                          5. Номер документа на сервисное обслуживание;
                          <br />
                          6. Наименование товара.
                          <br />
                        </p>
                        <p className={styles.shopFeedbackBlock__text_small}>
                          Благодарим вас за сотрудничество и конструктивную обратную связь о работе нашей компании.
                        </p>
                      </div>
                      <div id='shop-feedback-form-wrap' className={styles.shopFeedbackBlock__form}>
                        <form id='ticket-create-form' action='/feedback/' method='post' enctype='multipart/form-data'>
                          <input
                            type='hidden'
                            name='_csrf'
                            value='r0hK4lx2f_BmqmUFGm3F1UYbqR0K98MIpqAL9q8JQozkLD-NGhUoryHgAF1cOby-AC7wUzy49Ebu0l-82nA15g=='
                          />
                          <input type='hidden' id='ticketcreateform-key' name='TicketCreateForm[key]' />
                          <div className={styles.shopFeedbackBlock__short_fields}>
                            <div className={clsx(styles.formGroup, styles.fieldTicketcreateformUsername)}>
                              <input
                                type='text'
                                id='ticketcreateform-username'
                                className={styles.formControl}
                                name='TicketCreateForm[userName]'
                                value='egorizz'
                                required=''
                              />
                              <label className={styles.controlLabel} for='ticketcreateform-username'>
                                Имя
                              </label>
                              <p className={clsx(styles.helpBlock, styles.helpBlockError)}></p>
                            </div>
                            <div className={clsx(styles.formGroup, styles.fieldTicketcreateformUseremail)}>
                              <input
                                type='text'
                                id='ticketcreateform-useremail'
                                className={styles.formControl}
                                name='TicketCreateForm[userEmail]'
                                value='egorizz@mail.ru'
                                required=''
                              />
                              <label className={styles.controlLabel} for='ticketcreateform-useremail'>
                                Адрес эл. почты
                              </label>
                              <p className={clsx(styles.helpBlock, styles.helpBlockError)}></p>
                            </div>
                            <div className={clsx(styles.formGroup, styles.fieldTicketcreateformPhone)}>
                              <input
                                type='text'
                                id='ticketcreateform-phone'
                                className={styles.formControl}
                                name='TicketCreateForm[phone]'
                                value='79090935656'
                                required=''
                                data-phone='1'
                              />
                              <label className={styles.controlLabel} for='ticketcreateform-phone'>
                                Телефон
                              </label>
                              <p className={clsx(styles.helpBlock, styles.helpBlockError)}></p>
                            </div>
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformText, styles.required)}>
                            <textarea
                              id='ticketcreateform-text'
                              className={styles.formControl}
                              name='TicketCreateForm[text]'
                              rows='5'
                              required=''
                              aria-required='true'
                            ></textarea>
                            <label className={styles.controlLabel} for='ticketcreateform-text'>
                              Текст сообщения
                            </label>
                            <p className={clsx(styles.helpBlock, styles.helpBlockError)}></p>
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformCity, styles.required)}>
                            <input
                              type='hidden'
                              id='ticketcreateform-city'
                              className={styles.formControl}
                              name='TicketCreateForm[city]'
                              value='30b7c1f3-03fb-11dc-95ee-00151716f9f5'
                            />
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformCharter, styles.required)}>
                            <input
                              type='hidden'
                              id='ticketcreateform-charter'
                              className={styles.formControl}
                              name='TicketCreateForm[charter]'
                              value='0c4a702f-0acd-45c0-adb3-8ebe213e6bd8'
                            />
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformTheme)}>
                            <input
                              type='hidden'
                              id='ticketcreateform-theme'
                              className={styles.formControl}
                              name='TicketCreateForm[theme]'
                              value='5d5f3faf-8455-480a-a7fb-26b41ba5d51c'
                            />
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformBranch, styles.required)}>
                            <input
                              type='hidden'
                              id='ticketcreateform-branch'
                              className={styles.formControl}
                              name='TicketCreateForm[branch]'
                              value='9f9b1b68-3e39-11eb-a219-00155d28220e'
                            />
                          </div>
                          <div className={clsx(styles.formGroup, styles.fieldTicketcreateformFilesuploadhash)}>
                            <input
                              type='hidden'
                              id='ticketcreateform-filesuploadhash'
                              className={styles.formControl}
                              name='TicketCreateForm[filesUploadHash]'
                              value='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                            />
                          </div>
                          <div
                            className={styles.ajaxFileUploadWidget}
                            data-role='ajax-file-upload-widget'
                            id='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                            data-widget-hash='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                          >
                            <div className={clsx(styles.formGroup, styles.fieldAjaxfileuploadformUploadedfiles)}>
                              <label
                                className={styles.ajaxFileUploadWidget__label}
                                data-role='file-input-label'
                                for='ajaxfileuploadform-uploadedfiles'
                              >
                                <div className={styles.ajaxFileUploadWidget__labelIcon}></div>
                                <span
                                  className={styles.ajaxFileUploadWidget__labelText}
                                  data-toggle='tooltip'
                                  data-html='true'
                                  data-trigger='hover'
                                  data-placement='top'
                                  data-container='#cb783719-a30a-4cdf-9e66-ab0cca787b56'
                                  title=''
                                  data-original-title='Вы можете прикрепить изображение или документ формата: doc, docx, xls, xlsx, txt, pdf, jpeg, jpg, png.<br />
Общий объем файлов не должен превышать 300 Мб.<br />
Количество документов не более 15.'
                                >
                                  Прикрепить файлы
                                </span>
                              </label>
                              <input type='hidden' name='AjaxFileUploadForm[uploadedFiles][]' value='' />
                              <input
                                type='file'
                                id='ajaxfileuploadform-uploadedfiles'
                                className={styles.ajaxFileUploadWidget__fileInput}
                                name='AjaxFileUploadForm[uploadedFiles][]'
                                multiple=''
                                data-role='file-input'
                              />
                            </div>
                            <div
                              className={clsx(
                                styles.ajaxFileUploadWidget__error,
                                styles.ajaxFileUploadWidget__error_hidden
                              )}
                              data-role='error'
                            ></div>
                            <div
                              id='base-modal-2iQfxNUe'
                              className={clsx(
                                styles.ajaxFileInputRulesModal,
                                styles.baseModal,
                                styles.baseModal_hidden
                              )}
                              tabindex='-1'
                              role='dialog'
                              data-role='rules-modal'
                              data-handler-active=''
                              hidden=''
                            >
                              <div
                                className={clsx(styles.baseModal__backdrop, styles.handlerActive)}
                                data-base-modal-action='close'
                              ></div>
                              <div
                                className={clsx(styles.ajaxFileInputRulesModal__container, styles.baseModal__container)}
                              >
                                <div className={styles.baseModal__header}>
                                  <i
                                    className={clsx(
                                      styles.ajaxFileInputRulesModal__headerCloseIcon,
                                      styles.baseModal__headerCloseIcon,
                                      styles.handlerActive
                                    )}
                                    data-base-modal-action='close'
                                  ></i>
                                </div>
                                <div
                                  className={clsx(styles.ajaxFileInputRulesModal__content, styles.baseModal__content)}
                                >
                                  <p>
                                    Вы можете прикрепить изображение или документ формата: doc, docx, xls, xlsx, txt,
                                    pdf, jpeg, jpg, png.
                                    <br />
                                    Общий объем файлов не должен превышать 300 Мб.
                                    <br />
                                    Количество документов не более 15.
                                  </p>
                                  <div
                                    className={clsx(
                                      styles.ajaxFileInputRulesModal__selectFileButton,
                                      styles.btn,
                                      styles.btnAdditional
                                    )}
                                    data-role='select-file-button'
                                  >
                                    Выбрать файл
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={clsx(
                                styles.ajaxFileUploadWidget__uploadedFiles,
                                styles.ajaxFileUploadFilesList,
                                styles.ajaxFileUploadFilesList_hidden
                              )}
                              data-role='files-list'
                              data-upload-url='/file-upload/'
                              data-files-limit='15'
                            >
                              <div className={styles.ajaxFileUploadFilesList__fileSample}>
                                <div
                                  className={clsx(styles.filesList__file, styles.ajaxFileUploadFile, styles.file)}
                                  data-role='file-sample'
                                >
                                  <div className={styles.file__preview} data-role='preview'>
                                    <div className={styles.file__header}>
                                      <div className={styles.file__size} data-role='size'></div>
                                      <div
                                        className={styles.ajaxFileUploadFile__remove}
                                        data-role='remove-button'
                                      ></div>
                                    </div>
                                    <div
                                      className={clsx(styles.file__icon, styles.fileIcon, styles.fileIcon_hidden)}
                                      data-role='icon'
                                    ></div>
                                    <div
                                      className={clsx(styles.file__image, styles.file__image_hidden)}
                                      data-role='preview-image'
                                    ></div>
                                    <div
                                      className={clsx(
                                        styles.ajaxFileUploadFile__progressBar,
                                        styles.progressBar,
                                        styles.progressBar_hidden
                                      )}
                                      data-role='progress-bar'
                                    >
                                      <div className={styles.progressBar__bar} data-role='bar'></div>
                                    </div>
                                  </div>
                                  <div
                                    className={clsx(
                                      styles.ajaxFileUploadFile__title,
                                      styles.ajaxFileUploadFile__tile_hidden,
                                      styles.file__title
                                    )}
                                    data-role='title'
                                    data-filetype='... .'
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <input
                              type='hidden'
                              id='ajaxfileuploadform-widgethash'
                              className={styles.formControl}
                              name='AjaxFileUploadForm[widgetHash]'
                              value='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                              data-role='ajax-file-upload-widget-hash-input'
                            />
                            <input
                              type='hidden'
                              id='ajaxfileuploadform-objecttype'
                              className={styles.formControl}
                              name='AjaxFileUploadForm[objectType]'
                              value='feedback'
                              data-role='ajax-file-upload-widget-object-type-input'
                            />
                          </div>
                          <div className={styles.dnsRow}>
                            <div
                              className={clsx(styles.shopFeedbackBlock__policy, styles.shopFeedbackBlock__text_small)}
                            >
                              Нажимая кнопку «Отправить», Вы соглашаетесь c
                              <a
                                className={clsx(styles.uiLink, styles.uiLink_blue)}
                                href='/rules/policy/'
                                target='_blank'
                              >
                                Политикой конфиденциальности
                              </a>
                              и
                              <a
                                className={clsx(styles.uiLink, styles.uiLink_blue)}
                                href='/rules/personal-data/'
                                target='_blank'
                              >
                                Политикой компании в отношении обработки персональных данных
                              </a>
                              , а также - на получение почтовых рассылок рекламного и/или информационного характера.{' '}
                            </div>
                            <div className={styles.shopFeedbackBlock__submitBlock}>
                              <button
                                type='submit'
                                className={clsx(styles.nsBtn, styles.btnPrimary, styles.shopFeedbackBlock__submitBtn)}
                                data-role='btn-submit'
                                formnovalidate=''
                              >
                                Отправить
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className={clsx(styles.modal, styles.fade)} id='email-confirm-modal'>
                      <div className={styles.modalDialog}>
                        <div className={styles.modalContent}>
                          <div className={styles.modalHeader}>
                            <button
                              type='button'
                              className={clsx(styles.btn, styles.btnDefault, styles.modalCloseBtn)}
                              data-dismiss='modal'
                              aria-hidden='true'
                            >
                              <span className={styles.remove} aria-hidden='true'></span>
                            </button>
                          </div>
                          <div className={styles.modalBody}>
                            Пожалуйста, обратите внимание, что Вы не заполнили поле «Адрес эл.почты». В этом случае мы
                            не сможем сообщить результат рассмотрения Вашего обращения.{' '}
                          </div>
                          <div className={styles.modalFooter}>
                            <button type='button' className={clsx(styles.btn, styles.btnPrimary)} data-dismiss='modal'>
                              Указать адрес
                            </button>
                            <button
                              type='button'
                              className={clsx(styles.btn, styles.btnDefault)}
                              data-dismiss='modal'
                              id='email-modal-submit'
                            >
                              Отправить{' '}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.shopPageContent__section}>
                    <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='/shops/moscow/'>
                      Все магазины в г.Москва
                    </a>
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
