import { FC } from 'react';
import zaglushkaPoster from '../../app/assets/img/stock/poster.webp';
import zaglushkaProduct from '../../app/assets/img/stock/product.webp';
import styles from './stock.module.scss';
import { StockData } from './types';

interface IProps {
  data: StockData;
}

const StockItem: FC<IProps> = ({
  data: {
    stock: {
      id,
      endDate,
      startDate,
      name,
      image = zaglushkaPoster,
    },
    vobler = { text: 'Скидка 0% ого', color: '#ff4081' },
  },
}) => {
  const dateString = (start: Date, end: Date): string => {
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const isSameMonth = startMonth === endMonth;
    const isSameYear = startYear === endYear;

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: isSameMonth && isSameYear ? undefined : 'long',
      year: isSameYear ? undefined : 'numeric',
    };
    const startString = start.toLocaleDateString('ru-RU', options);
    const formatStartString = isSameYear ? startString : startString.slice(0, -2);

    const endString = end.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    const formatEndString = endString.slice(0, -2) + 'года';

    return `С ${formatStartString} по ${formatEndString}`;
  };

  return (
    <div className={styles.stock}>
      <div className={styles.poster}>
        <a href='/'>
          <img src={image || zaglushkaPoster} alt='Реклама' />
        </a>
      </div>
      <div className={styles.texts}>
        <a href='/' className={styles.texts__title}>
          {name}
        </a>
        <p className={styles.texts__dates}>{dateString(new Date(startDate), new Date(endDate))}</p>
        <div className={styles.vobler}>
          <style>
            {`#vobler-${id} {
              color: ${vobler.color};
            }
            #vobler-${id}:after {
              background-color: ${vobler.color};
            }`}
          </style>
          <div className={styles.vobler__name} id={`vobler-${id}`} title={vobler.text}>
            {vobler.text}
          </div>
        </div>
      </div>
      <div className={styles.product}>
        <div className={styles.product__picture}>
          <a href='/'>
            <img src={zaglushkaProduct} alt='Товар' />
          </a>
        </div>
        <div className={styles.product__text}>
          <p className={styles.product__name}>
            <a href='/'>Водонагреватель электрический Zanussi ZWH/S 80 Brillianto</a>
          </p>
          <a href='/' className={styles.product__link}>
            Ещё 9 товаров<i></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
