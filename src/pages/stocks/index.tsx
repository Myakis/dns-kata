import { FC } from 'react';
import styles from './stocks.module.scss';
import Stock from 'entities/stock';
import { useGetStocksQuery } from 'shared/api/DNS';
import { Pagination } from 'antd';
import clsx from 'clsx';

const Stocks: FC = () => {
  const { data: stocks, isLoading } = useGetStocksQuery('');

  const list = stocks?.map((stock, indx) => {
    if (indx > 19) {
      return null;
    }
    return <Stock key={stock.id} data={{ stock }} />;
  });

  const render = !isLoading ? list : 'Loading...';

  return (
    <>
      <ul className={styles.sort}>
        <li className={clsx(styles.sort__item, styles.sort__item_active)}>
          <button type='button' className={styles.sort__button}>
            Новые
          </button>
        </li>
        <li className={styles.sort__item}>
          <button type='button' className={styles.sort__button}>
            Популярные
          </button>
        </li>
        <li className={styles.sort__item}>
          <button type='button' className={styles.sort__button}>
            Скоро закончатся
          </button>
        </li>
      </ul>
      {render}
      {/* {isLastPage ? null : <div>Показать Еще...</div>} */}
      <div className={styles.showMore}>
        <button className={styles.showMore__button}>Показать Еще...</button>
      </div>
      <div className={styles.pagination}>
        <Pagination
          total={100}
          current={1}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default Stocks;
