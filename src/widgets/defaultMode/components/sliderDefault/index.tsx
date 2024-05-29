import { FC, useState, useRef } from 'react';
import { ShopImage, DefaultProps } from 'pages/shopCard';
import styles from './sliderDefault.module.scss';
import { clsx } from 'clsx';

const SliderDefault: FC<DefaultProps> = ({ totalSlides, shopImages, toggleFullscreenMode }) => {
  const [sliderLength, setSliderLength] = useState<number>(totalSlides * 150); //ДЛЯ ОСНОВНОГО ЭКРАНА
  const initialSliderLength = useRef<number>(sliderLength); //неизменяемая начальная длина всех слайдов ДЛЯ ОСНОВНОГО ЭКРАНА
  const [next, setNext] = useState<number>(0); // Состояние для кнопки слайдера ДЛЯ ОСНОВНОГО ЭКРАНА

  // Функция для генерации элемента слайдера с изображением НА ОСНОВНОМ ЭКРАНЕ
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

  //функции для переключения слайдов НА ОСНОВНОМ ЭКРАНЕ
  const moveSlidesRight = () => {
    setNext((prev) => prev - 150);
    setSliderLength((prev) => prev - 150);
  };

  const moveSlidesLeft = () => {
    setNext((prev) => prev + 150);
    setSliderLength((prev) => prev + 150);
  };

  return (
    <div className={clsx(styles.shopPageContent__photoSlider, styles.shopImageSlider)}>
      <div className={styles.tnsOuter}>
        <div className={styles.tnsControls} aria-label='Carousel Navigation'>
          <button
            type='button'
            data-controls='prev'
            aria-controls='tns1'
            onClick={() => moveSlidesLeft()}
            style={sliderLength !== initialSliderLength.current ? { display: 'initial' } : { display: 'none' }}
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
        <div className={clsx(styles.tnsLiveregion, styles.tnsVisuallyHidden)} aria-live='polite' aria-atomic='true'>
          slide <span className={styles.current}>1 to 12</span> of 45
        </div>
        <div id='tns1-mw' className={styles.tnsOvh}>
          <div className={styles.tnsInner} id='tns1-iw'>
            <div
              data-role='slider'
              className={clsx(styles.tnsSlider, styles.tnsSubpixel, styles.tnsHorizontal, styles.tnsDefault)}
              id='tns1'
              style={{ transitionDuration: '0.3s', transform: `translate3d(${next}px, 0px, 0px)` }}
            >
              {shopImages.map((image) => generateShopImageSliderItem(image))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderDefault;
