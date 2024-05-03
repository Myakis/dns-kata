import { FC, ReactNode, useState } from 'react';
import horizontalStyles from './product-horizontal.module.scss';
import verticalStyles from './product-vertical.module.scss';
import { rateListStyles } from './types';
import './variables.css';

interface ProductProps {
  id?: string | number;
  photo?: string;
  name?: string;
  isHorizontal?: boolean;
  vobler?: {
    text: string;
    color?: string;
  };
  statistic?: {
    rate: number;
    reviews: number;
    comments: number;
  };
  price?: {
    currentPrice: number;
    prevPrice?: number;
    creditPrice?: number;
  };
  avails?: {
    shops: number;
    pvz: boolean;
    delivery: string;
  };
}

const Product: FC<ProductProps> = ({
  id = 5402341,
  photo = 'https://www.electrogor.ru/img/work/nomencl/m_121357.jpg',
  name = '10.2" Планшет Apple iPad (9th Gen) Wi-Fi 64 ГБ серый [2160x1620, IPS, 6x2.66 ГГц, 3 ГБ, 8686 мА*ч, iPadOS 15]',
  isHorizontal = true,
  vobler = { text: 'Sale', color: '#ff3322' },
  statistic = { rate: 4.5, reviews: 1244, comments: 23 },
  price = { currentPrice: 37456, prevPrice: 0, creditPrice: 2333 },
  avails = { shops: 25, pvz: true, delivery: 'за 4 часа' },
}) => {
  const [isMouseOvered, setIsMouseOvered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const styles = isHorizontal ? horizontalStyles : verticalStyles;
  const { star, halfStar, emptyStar } = styles;
  const rateStars: ReactNode[] = rateList(statistic.rate, { star, halfStar, emptyStar });

  function rateList(rate: number, styles: rateListStyles): ReactNode[] {
    const rateStars: ReactNode[] = [];
    const { star, halfStar, emptyStar } = styles;
    let rateCopy = rate;

    for (let indx = 0; indx < 5; indx++) {
      const styleName = rateCopy >= 1 ? star : rateCopy >= 0.5 ? halfStar : emptyStar;

      const starElement = <i key={indx} className={styleName}></i>;

      rateStars.push(starElement);
      rateCopy -= 1;
    }
    return rateStars;
  }

  const productCode = (
    <div className={isMouseOvered ? styles.image__code : styles.none}>
      <i></i>&nbsp;{id}
    </div>
  );

  const extendStatistics = (
    <>
      {' '}
      <a className={styles.comment} href='/'>
        <i></i>&nbsp;{statistic.comments}
      </a>
      <a className={styles.service} href='/'>
        <i></i>Отличная надежность
      </a>
    </>
  );

  const shopsBlock = (
    <div>
      <span>В наличии </span>
      <a href='/' className={styles.avails__link}>
        в {avails.shops} магазинах
      </a>
    </div>
  );

  const pvzBlock = (
    <div>
      <span>Пункты выдачи </span>
      <a href='/' className={styles.avails__link}>
        доступны {avails.pvz}
      </a>
    </div>
  );

  const deliveryBlock = (
    <div>
      <span>Доставим на дом </span>
      <a href='/' className={styles.avails__link}>
        {avails.delivery}
      </a>
    </div>
  );

  return (
    <section
      className={styles.product}
      onMouseOver={() => setIsMouseOvered(true)}
      onFocus={() => setIsMouseOvered(true)}
      onMouseOut={() => setIsMouseOvered(false)}
      onBlur={() => setIsMouseOvered(false)}
    >
      <div className={styles.image}>
        <a href='/' className={styles.image__link}>
          <picture>
            <img className={styles.image__picture} alt='product' src={photo} />
          </picture>
          <i className={isMouseOvered ? styles.image__zoom : undefined}></i>
        </a>
        <span className={styles.image__discount}>-10%</span>
        {isHorizontal ? productCode : null}
      </div>
      <a href='/' className={styles.name}>
        <span className={styles.name__span}>{name}</span>
      </a>
      <div className={styles.vobler}>
        <style>
          {`#vobler{
            color: ${vobler.color};
          }
          #vobler:after {
            background-color: ${vobler.color};
          }`}
        </style>
        <div className={styles.vobler__name} id='vobler' title={vobler.text}>
          {vobler.text}
        </div>
      </div>
      <div className={styles.statistic}>
        <span className={styles.compareCheckbox}>
          <label className={styles.compareCheckbox__label}>
            <span>Сравнить</span>
            <input type='checkbox' className={styles.compareCheckbox__input} />
            <span className={styles.compareCheckbox__box}></span>
          </label>
        </span>
        <a className={styles.rating} href='/'>
          {rateStars}
          {statistic.reviews}
        </a>
        {isHorizontal ? extendStatistics : null}
      </div>
      <div className={styles.buy}>
        <div className={styles.buy__wrap}>
          <div className={price.prevPrice ? `${styles.buy__price} ${styles.buy__sale}` : styles.buy__price}>
            {`${price.currentPrice} ₽`}
            <span className={styles.buy__prev}>{price.prevPrice ? price.prevPrice : null}</span>
          </div>
          <div className={styles.buy__hint}></div>
          <div className={styles.buy__sub}>{price.creditPrice ? `или ${price.creditPrice} ₽/ мес.` : null}</div>
        </div>
        <button
          type='button'
          data-tooltip='Добавить в избранное'
          onClick={() => setIsLiked((prev) => !prev)}
          className={isLiked ? `${styles.wishlist} ${styles.liked}` : styles.wishlist}
        ></button>
        <button type='button' className={`${styles.cart} ${isMouseOvered ? styles.cartOnMouseover : undefined}`}>
          {isHorizontal ? 'купить' : null}
        </button>
      </div>
      <span className={styles.avails}>
        {avails.shops ? shopsBlock : null}
        {avails.pvz ? pvzBlock : null}
        {avails.delivery ? deliveryBlock : null}
        {!avails.shops && !avails.pvz && !avails.delivery ? 'Товара нет в наличии' : null}
      </span>
    </section>
  );
};

export default Product;
