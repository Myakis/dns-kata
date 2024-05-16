import { FC, useState } from 'react';
import styles from './stocks.module.scss';
import Stock from 'entities/stock';
import { useGetStocksQuery } from 'shared/api/DNS';
import { Pagination } from 'antd';
import clsx from 'clsx';
import { Sort } from './types';
import { IStock } from 'entities/stock/types';

const Stocks: FC = () => {
  const { data: stocks, isLoading } = useGetStocksQuery('');
  const [sort, setSort] = useState<Sort>('new');
  const [range, setRange] = useState(1);
  const [page, setPage] = useState(1);

  const sortFunc = (stocks: IStock[] | undefined, sortString: string): IStock[] | undefined => {
    if (!stocks) {
      return stocks;
    }
    const stocksCopy = [...stocks];

    switch (sortString) {
      case 'new':
        return stocksCopy.sort((stock1, stock2): number => {
          const startDate1 = new Date(stock1.startDate);
          const startDate2 = new Date(stock2.startDate);

          return Number(startDate2) - Number(startDate1);
        });
      case 'popular':
        return stocksCopy.sort((stock1, stock2): number => {
          if (stock1 === stock2) {
            return 0;
          } else if (stock1) {
            return -1;
          }

          return 1;
        });
      case 'expires':
        return stocksCopy.sort((stock1, stock2): number => {
          const endDate1 = new Date(stock1.endDate);
          const endDate2 = new Date(stock2.endDate);

          return Number(endDate1) - Number(endDate2);
        });
    }
  };

  const handleShowMore = () => {
    setRange((prevRange) => prevRange + 1);
    setPage((prevPage) => prevPage + 1);
  };

  const handlePagination = (page: number) => {
    setPage(page);
    setRange(1);
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  const list = sortFunc(stocks, sort)?.map((stock, indx) => {
    const listRange = page * 20 - 20 * range;

    if (indx <= listRange || indx >= page * 20) {
      return null;
    }
    return <Stock key={stock.id} data={{ stock }} />;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!list) {
    return <div>При загрузке списка акций произошла ошибка!</div>;
  }

  const isLastPage = page * 20 >= list?.length;

  return (
    <>
      <ul className={styles.sort}>
        <li className={clsx(styles.sort__item, sort === 'new' && styles.sort__item_active)}>
          <button onClick={() => setSort('new')} type='button' className={styles.sort__button}>
            Новые
          </button>
        </li>
        <li className={clsx(styles.sort__item, sort === 'popular' && styles.sort__item_active)}>
          <button onClick={() => setSort('popular')} type='button' className={styles.sort__button}>
            Популярные
          </button>
        </li>
        <li className={clsx(styles.sort__item, sort === 'expires' && styles.sort__item_active)}>
          <button onClick={() => setSort('expires')} type='button' className={styles.sort__button}>
            Скоро закончатся
          </button>
        </li>
      </ul>
      {list}
      {isLastPage ? null : (
        <div className={styles.showMore}>
          <button onClick={handleShowMore} className={styles.showMore__button}>
            Показать Еще...
          </button>
        </div>
      )}
      <div className={styles.pagination}>
        <Pagination
          onChange={handlePagination}
          total={list?.length}
          current={page}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default Stocks;
