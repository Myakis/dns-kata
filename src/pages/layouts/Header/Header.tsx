import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.upper_header}>
        <div className={styles.location}>
          <a>Москва</a>
        </div>
        <nav>
          <ul className={styles.header_navigation}>
            <li>
              <a href=''>Акции</a>
            </li>
            <li>
              <a href=''>Магазины</a>
            </li>
            <li>
              <a href=''>Покупателям</a>
            </li>
            <li>
              <a href=''>Юридическим лицам</a>
            </li>
            <li>
              <a href=''>Клуб DNS</a>
            </li>
            <li>
              <a href=''>Вакансии</a>
            </li>
          </ul>
        </nav>
        <div className={styles.tel}>
          <a href='tel:8-800-77-07-999'>8-800-77-07-999</a>
        </div>
      </div>
      <div className={styles.main_header}>
        <div className={`${styles.orange_btn} ${styles.header_btn_bg}`}>
          <a className={styles.logo_btn}></a>
          <button className={styles.catalog_btn}>Каталог</button>
        </div>
        <div className={styles.search_wrapper}>
          <input type='text' className={styles.search} placeholder='Поиск по сайту' />
          <button className={styles.search_btn}></button>
        </div>
        <nav>
          <ul className={styles.side_nav}>
            <li className={styles.compare}>
              <a href=''>Сравнение</a>
            </li>
            <li className={styles.favorited}>
              <a href=''>Избранное</a>
            </li>
            <li className={styles.basket}>
              <a href=''>Корзина</a>
            </li>
            <li className={styles.log_in}>
              <a href=''>Войти</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
