import { FC } from 'react';
import zaglushkaPoster from './6f690fae9f30027edf79df2eb6dede25966ac55541ff57463a804b771a168b7a.jpg.webp';
import zaglushkaProduct from './bb0ef449ff07b96c4d215aadef860333e565845637d76b7355cfe1282ecf5baf.jpg.webp';
import styles from './saleItem.module.scss';

interface SaleItemProps {
  id: number;
  vobler: {
    text: string;
    color?: string;
  };
}

const SaleItem: FC<SaleItemProps> = ({ id, vobler = { text: 'Жесть скидка 0% надо брать' } }) => {
  return (
    <div className={styles.sale}>
      <div className={styles.poster}>
        <a href='/'>
          <img src={zaglushkaPoster} alt='Реклама' />
        </a>
      </div>
      <div className={styles.texts}>
        <a href='/' className={styles.texts__title}>
          Выгодные цены на водонагреватели Electrolux, Zanussi и Ballu!
        </a>
        <p className={styles.texts__dates}>с 6 по 20 мая 2024 года</p>
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
