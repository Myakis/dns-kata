import { FC } from 'react';
import zaglushkaPoster from './6f690fae9f30027edf79df2eb6dede25966ac55541ff57463a804b771a168b7a.jpg.webp';
import zaglushkaProduct from './bb0ef449ff07b96c4d215aadef860333e565845637d76b7355cfe1282ecf5baf.jpg.webp';
import styles from './stock.module.scss';
import { StockData } from './types';

interface IProps {
  data: StockData;
}

const StockItem: FC<IProps> = ({
  data: {
    stock: {
      id = 1,
      endDate = '2023-10-24T10:28:53.363Z',
      startDate = '2023-09-24T20:07:20.331Z',
      name = 'Жестка скидка вау надо брать вери найс покупаю.',
      image = 'https://c.dns-shop.ru/thumb/st1/crop/344/244/7d5921150dbc0f33074701ef505ab979/892e02c36283e1080a354592931d0bee60523b5b4292a466716309fef47f14ed.jpg.webp',
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
