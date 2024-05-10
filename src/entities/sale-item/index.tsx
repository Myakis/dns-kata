import { FC } from 'react';
import zaglushkaPoster from './6f690fae9f30027edf79df2eb6dede25966ac55541ff57463a804b771a168b7a.jpg.webp';
import zaglushkaProduct from './bb0ef449ff07b96c4d215aadef860333e565845637d76b7355cfe1282ecf5baf.jpg.webp';
import styles from './saleItem.module.scss';
import { StockData } from './types';

interface IProps {
  data: StockData;
}

const SaleItem: FC<IProps> = ({
  data: {
    stock: {
      id = 1,
      endDate = new Date(),
      startDate = new Date(0),
      isPopular = true,
      name = 'Жестка скидка вау надо брать вери найс покупаю.',
      image = 'https://c.dns-shop.ru/thumb/st1/crop/344/244/7d5921150dbc0f33074701ef505ab979/892e02c36283e1080a354592931d0bee60523b5b4292a466716309fef47f14ed.jpg.webp',
    },
    vobler = { text: 'Скидка 0% ого', color: '#000' },
  },
}) => {

  const dateSting: string = (startDate: Date, endDate: Date) => {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    const startMonth = startDate.getMonth();
    const startMonth = startDate.getMonth();
  }

  return (
    <div className={styles.sale}>
      <div className={styles.poster}>
        <a href='/'>
          <img src={image || zaglushkaPoster} alt='Реклама' />
        </a>
      </div>
      <div className={styles.texts}>
        <a href='/' className={styles.texts__title}>
          {name}
        </a>
        <p className={styles.texts__dates}>{dateSting}</p>
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

export default SaleItem;
