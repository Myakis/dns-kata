import { FC, useRef, useState, useEffect } from 'react';
import { ShopComponentProps, ShopImage } from 'pages/shopCard/shopCard.types';
import styles from './fullscreenMode.module.scss';
import clsx from 'clsx';

const FullscreenMode: FC<ShopComponentProps> = ({
  totalSlides,
  fullscreenMode,
  article,
  toggleFullscreenMode,
  shopImages,
  imageIndex,
  setImageIndex,
}) => {
  const [sliderLengthFullscreen, setSliderLengthFullscreen] = useState(totalSlides * 82); //ДЛЯ ФУЛСКРИНА
  const initialSliderLengthFullscreen = useRef(sliderLengthFullscreen); //неизменяемая начальная длина всех слайдов ДЛЯ ФУЛСКРИНА

  const [nextFullscreen, setNextFullscreen] = useState(0); // Состояние для кнопки слайдера ДЛЯ ФУЛСКРИНА
  const [isLoadingImage, setIsLoadingImage] = useState(false); //ДЛЯ ФУЛСКРИНА

  // Этот код управляет видимостью элемента с классом tnsControls в зависимости от ширины окна и состояния полноэкранного режима.
  // Когда окно изменяет размер, элемент скрывается или отображается, в зависимости от ширины окна и других условий.

  useEffect(() => {
    const handleResize = () => {
      if (!fullscreenMode) {
        return;
      }

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

  //функции для переключения нижнего слайдера В ФУЛСКРИНЕ
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

  // Функция для генерации элемента слайдера с изображением В ФУЛСКРИНЕ
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

  //функия для выбора слайда в нижнем сладере В ФУЛСКРИНЕ
  const chooseImage = (item: number) => {
    setImageIndex(item - 1);
  };

  // Функция для переключения на следующий элемент слайдера В ФУЛСКРИНЕ
  const stepRight = () => {
    setIsLoadingImage(true); // Устанавливаем состояние, что изображение загружается

    setImageIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

    setTimeout(() => setIsLoadingImage(false), 500); // Сбрасываем состояние после изменения imageIndex
  };

  // Функция для переключения на предыдущий элемент слайдера В ФУЛСКРИНЕ
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

  return (
    <div className={styles.mediaViewer}>
      <div className={styles.mediaViewer__head}>
        <div className={styles.mediaViewer__headText}>{article.name}</div>
        <i className={styles.mediaViewer__close} onClick={() => toggleFullscreenMode(0)}></i>
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
          <div className={styles.mediaViewerImage__imageCounter}>{imageIndex + 1} из {totalSlides}</div>
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
  );
};

export default FullscreenMode;
