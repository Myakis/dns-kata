import styles from './header.module.scss';
import classNames from 'classnames';
import { useHeaderConstants } from './constants';
import { useEffect } from 'react';
import { useClickOutside } from 'shared/hooks/useClickOutside';

export const Header: React.FC = () => {
  const {
    handleOnCatalogBtnClick,
    handleScroll,
    handleOnSearchFocus,
    setIsOnCatalogBtnClick,
    setIsOnToCustomersBtnClick,
    setOnSearchFocus,
    toCustomersPopupRef,
    isOnToCustomersBtnClick,
    isOnCatalogBtnClick,
    isScrolled,
    mainCategories,
    onSearchFocus,
    subcategories,
    navigationItems,
    catalogRef,
    searchRef,
  } = useHeaderConstants();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOnCatalogBtnClick) {
      useClickOutside(catalogRef, () => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);
    } else if (isOnToCustomersBtnClick) {
      useClickOutside(
        toCustomersPopupRef,
        () => setIsOnToCustomersBtnClick(false),
        styles['upper-header__to-customers-btn']
      );
    } else if (onSearchFocus)
      useClickOutside(searchRef, () => setOnSearchFocus(false), styles['main-header__search-wrapper']);
  }, [isOnCatalogBtnClick, isOnToCustomersBtnClick, onSearchFocus]);

  return (
    <div className={classNames(styles.header)}>
      <div className={styles['upper-header']}>
        <div className={styles['upper-header__location']}>
          <a className={styles['header-link']}>Москва</a>
        </div>
        <nav>
          <ul className={styles['upper-header__navigation']}>{navigationItems}</ul>
        </nav>
        <div className={styles['upper-header__tel']}>
          <a href='tel:8-800-77-07-999' className={styles['header-link']}>
            8-800-77-07-999
          </a>
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
            [styles['main-header--bg-shadow']]: isOnCatalogBtnClick || onSearchFocus,
          })}
        >
          <div
            className={classNames(styles['main-header__orange-btn'], styles['main-header__btn-bg'], {
              [styles['main-header__btn-bg--active']]: isOnCatalogBtnClick,
            })}
          >
            <a className={styles['main-header__logo-btn']}></a>
            <button
              onClick={handleOnCatalogBtnClick}
              className={classNames(styles['main-header__catalog-btn'], {
                [styles['main-header__catalog-btn--active']]: isOnCatalogBtnClick,
              })}
            >
              Каталог
            </button>
          </div>
          <div
            ref={searchRef}
            className={classNames(styles['main-header__search-wrapper'], {
              [styles['main-header__search-wrapper--focused']]: onSearchFocus,
            })}
          >
            <input
              type='text'
              className={styles['main-header__search']}
              placeholder='Поиск по сайту'
              onFocus={handleOnSearchFocus}
            />
            <button className={styles['main-header__search-btn']}></button>
          </div>
          <nav>
            <ul className={styles['main-header__side-nav']}>
              <li className={styles['side-nav__compare']}>
                <a href='' className={styles['header-link']}>
                  Сравнение
                </a>
              </li>
              <li className={styles['side-nav__favorited']}>
                <a href='' className={styles['header-link']}>
                  Избранное
                </a>
              </li>
              <li className={styles['side-nav__basket']}>
                <a href='' className={styles['header-link']}>
                  Корзина
                </a>
              </li>
              <li className={styles['side-nav__log-in']}>
                <a href='' className={styles['header-link']}>
                  Войти
                </a>
              </li>
            </ul>
          </nav>
          <div
            ref={catalogRef}
            className={classNames(styles['main-header__catalog'], {
              [styles['main-header__catalog--closed']]: !isOnCatalogBtnClick,
              [styles['main-header__catalog--opened']]: isOnCatalogBtnClick,
              [styles['main-header__catalog--fixed']]: isScrolled,
            })}
          >
            <nav className={styles['main-header__categories']}>
              <ul>{mainCategories}</ul>
            </nav>
            <nav className={styles['main-header__subcategories']}>
              <ul className={styles['main-header__subcategories--first']}>{subcategories}</ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
