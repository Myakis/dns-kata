import styles from './Header.module.scss';
import { useEffect } from 'react';

export const Header: React.FC = () => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const mainHeader = document.querySelector(`.${styles['main-header']}`);
    const mainHeaderContainer = document.querySelector(`.${styles['main-header__container']}`);

    const scrollThreshold = 50;

    if (mainHeader && window.scrollY > scrollThreshold) {
      mainHeader.classList.add(styles['main-header--fixed']);
      mainHeaderContainer?.classList.add(styles['main-header__container--fixed']);
    } else {
      mainHeader?.classList.remove(styles['main-header--fixed']);
      mainHeaderContainer?.classList.remove(styles['main-header__container--fixed']);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles['upper-header']}>
        <div className={styles['upper-header__location']}>
          <a>Москва</a>
        </div>
        <nav>
          <ul className={styles['upper-header__navigation']}>
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
        <div className={styles['upper-header__tel']}>
          <a href='tel:8-800-77-07-999'>8-800-77-07-999</a>
        </div>
      </div>
      <div className={styles['main-header']}>
        <div className={styles['main-header__container']}>
          <div className={`${styles['main-header__orange-btn']} ${styles['main-header__btn-bg']}`}>
            <a className={styles['main-header__logo-btn']}></a>
            <button className={styles['main-header__catalog-btn']}>Каталог</button>
          </div>
          <div className={styles['main-header__search-wrapper']}>
            <input type='text' className={styles['main-header__search']} placeholder='Поиск по сайту' />
            <button className={styles['main-header__search-btn']}></button>
          </div>
          <nav>
            <ul className={styles['main-header__side-nav']}>
              <li className={styles['side-nav__compare']}>
                <a href=''>Сравнение</a>
              </li>
              <li className={styles['side-nav__favorited']}>
                <a href=''>Избранное</a>
              </li>
              <li className={styles['side-nav__basket']}>
                <a href=''>Корзина</a>
              </li>
              <li className={styles['side-nav__log-in']}>
                <a href=''>Войти</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
