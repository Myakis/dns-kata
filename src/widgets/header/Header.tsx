import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
// import catalog from './catalog.json';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollValue = 50;
    setIsScrolled(window.scrollY > scrollValue);
  };

  const handleOnCatalogBtnClick = () => {
    setIsOnCatalogBtnClick((prevState) => !prevState);
  };

  return (
    <div className={classNames(styles.header)}>
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
      <div
        className={classNames(styles['main-header'], {
          [styles['main-header--fixed']]: isScrolled,
        })}
      >
        <div
          className={classNames(styles['main-header__container'], {
            [styles['main-header__container--fixed']]: isScrolled,
            [styles['main-header--bg-shadow']]: isOnCatalogBtnClick,
          })}
        >
          <div className={classNames(styles['main-header__orange-btn'], styles['main-header__btn-bg'])}>
            <a className={styles['main-header__logo-btn']}></a>
            <button onClick={handleOnCatalogBtnClick} className={styles['main-header__catalog-btn']}>
              Каталог
            </button>
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
          <div
            className={classNames(styles['main-header__catalog'], {
              [styles['main-header__catalog--closed']]: !isOnCatalogBtnClick,
              [styles['main-header__catalog--opened']]: isOnCatalogBtnClick,
              [styles['main-header__catalog--fixed']]: isScrolled,
            })}
          ></div>
        </div>
      </div>
    </div>
  );
};
