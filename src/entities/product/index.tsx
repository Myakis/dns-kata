import { FC, ReactNode, useMemo, useState } from 'react';
import horizontalStyles from './product-horizontal.module.scss';
import verticalStyles from './product-vertical.module.scss';
import { productData, rateListStyles } from './types';
import clsx from 'clsx';

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

function salePrice(price: number, sale: number): number {
  const newPricePercent = 100 - sale;
  const newPricePercentToFixed = Number((newPricePercent / 100).toFixed(2));
  const newPrice = Math.round(price * newPricePercentToFixed);

  return newPrice;
}

function renderDeliveryBlock(style: string, text?: string): ReactNode {
  return (
    <div>
      <span>Доставим на дом </span>
      <a href='/' className={style}>
        {text}
      </a>
    </div>
  );
}

function renderPVZblock(style: string): ReactNode {
  return (
    <div>
      <span>Пункты выдачи </span>
      <a href='/' className={style}>
        доступны
      </a>
    </div>
  );
}

function renderShopsBlock(style: string, shops: number): ReactNode {
  return (
    <div>
      <span>В наличии </span>
      <a href='/' className={style}>
        в {shops} магазинах
      </a>
    </div>
  );
}

function renderExtendedStatistic(commentStyle: string, serviceStyle: string, comments: number): ReactNode {
  return (
    <>
      {' '}
      <a className={commentStyle} href='/'>
        <i></i>&nbsp;{comments}
      </a>
      <a className={serviceStyle} href='/'>
        <i></i>Отличная надежность
      </a>
    </>
  );
}

interface IProps {
  data: productData;
  isHorizontal?: boolean;
}

const Product: FC<IProps> = ({
  data: {
    code,
    photo = 'https://www.electrogor.ru/img/work/nomencl/m_121357.jpg',
    name = '10.2" Планшет Apple iPad (9th Gen) Wi-Fi 64 ГБ серый [2160x1620, IPS, 6x2.66 ГГц, 3 ГБ, 8686 мА*ч, iPadOS 15]',
    vobler = { text: 'Sale', color: '#ff3322' },
    statistic = { rate: 4.5, reviews: 1244, comments: 23 },
    price = { price: 37456, sale: 0 },
    avails = { shops: 25, pvz: true, delivery: 'за 4 часа' },
  },
  isHorizontal = true,
}) => {
  const [isMouseOvered, setIsMouseOvered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const styles = isHorizontal ? horizontalStyles : verticalStyles;

  const { star, halfStar, emptyStar } = styles;
  const rateStars: ReactNode[] = rateList(statistic.rate, { star, halfStar, emptyStar });
  const currentPrice = price?.sale ? salePrice(price.price, price.sale) : price.price;

  const extendStatistics = renderExtendedStatistic(styles.comment, styles.service, statistic.comments);
  const shopsBlock = renderShopsBlock(styles.avails__link, avails.shops);
  const pvzBlock = renderPVZblock(styles.avails__link);
  const deliveryBlock = renderDeliveryBlock(styles.avails__link, avails.delivery);

  const saleBlock = <span className={styles.image__discount}>-{price.sale}%</span>;
  const productCode = (
    <div className={isMouseOvered ? styles.image__code : styles.none}>
      <i></i>&nbsp;{code}
    </div>
  );

  const isAvailable = useMemo(() => avails.shops || avails.pvz || avails.delivery, [avails.shops, avails.pvz, avails.delivery]);

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
          <i className={clsx(isMouseOvered && styles.image__zoom)}></i>
        </a>
        {price?.sale ? saleBlock : null}
        {isHorizontal ? productCode : null}
      </div>
      <a href='/' className={styles.name}>
        <span className={styles.name__span}>{name}</span>
      </a>
      <div className={styles.vobler}>
        <style>
          {`#vobler-${code} {
            color: ${vobler.color};
          }
          #vobler-${code}:after {
            background-color: ${vobler.color};
          }`}
        </style>
        <div className={styles.vobler__name} id={`vobler-${code}`} title={vobler.text}>
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
          <div className={clsx(styles.buy__price, price?.sale && styles.buy__sale)}>
            {`${currentPrice.toLocaleString()} ₽`}
            <span className={styles.buy__prev}>{price?.sale ? price.price.toLocaleString() : null}</span>
          </div>
          <div className={styles.buy__hint}></div>
          <div className={styles.buy__sub}>или {Math.round(currentPrice / 10).toLocaleString()} ₽/ мес.</div>
        </div>
        <button
          type='button'
          data-tooltip='Добавить в избранное'
          onClick={() => setIsLiked((prev) => !prev)}
          className={clsx(styles.wishlist, isLiked && styles.liked)}
        ></button>
        <button
          type='button'
          className={clsx(styles.cart, isMouseOvered && styles.cartOnMouseover, !isAvailable && styles.bell)}
        >
          {isHorizontal && isAvailable ? 'Купить' : null}
          {isHorizontal && !isAvailable ? 'Уведомить' : null}
        </button>
      </div>
      <span className={styles.avails}>
        {avails.shops ? shopsBlock : null}
        {avails.pvz ? pvzBlock : null}
        {avails.delivery ? deliveryBlock : null}
        {!isAvailable ? 'Товара нет в наличии' : null}
      </span>
    </section>
  );
};

export default Product;
