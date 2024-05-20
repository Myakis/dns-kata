import clsx from 'clsx';
import { useOnScroll } from 'shared/hooks/useOnScroll';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import DropdownMenu from 'shared/ui/dropdown-menu';
import Auth from 'widgets/auth';
import Catalog from './component';
import { navigationLinks, sideNavigationItems, toCustomersLinks } from './constants';
import styles from './header.module.scss';

const Header: FC = () => {
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);
  const [onSearchFocus, setOnSearchFocus] = useState(false);
  const [onPhoneHover, setOnPhoneHover] = useState(false);

  // Действия при клике вне блока
  const catalogRef = useClickOutside(() => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);
  const searchRef = useClickOutside(() => setOnSearchFocus(false));

  const isScrolled = useOnScroll();

  const navigationItems = navigationLinks.map((el) =>
    el.label === 'Покупателям' ? (
      <DropdownMenu
        className={styles['upper-header__dropdown']}
        key={el.label}
        dropdownItems={toCustomersLinks}
        toggleContent={el.label}
        toggleArrow={true}
        listClassName={styles['upper-header__to-customers-dropdown']}
        linkClassName={styles['header-link']}
        toggleClassname={styles['upper-header__to-customers-btn']}
      />
    ) : (
      <li key={el.label}>
        <Link className={styles['header-link']} to={el.address}>
          {el.label}
        </Link>
      </li>
    )
  );

  return (
    <div className={styles.header}>
      <div className={styles['upper-header']}>
        <div className={styles['upper-header__location']}>
          <a className={styles['header-link']} href='/'>
            Москва
          </a>
        </div>
        <nav>
          <ul className={styles['upper-header__navigation']}>{navigationItems}</ul>
        </nav>
        <div className={styles['upper-header__tel']}>
          <a
            href='tel:8-800-77-07-999'
            className={styles['header-link']}
            onMouseEnter={() => setOnPhoneHover((prevState) => !prevState)}
            onMouseLeave={() => setOnPhoneHover(false)}
          >
            8-800-77-07-999
          </a>
          {onPhoneHover ? (
            <div className={styles['upper-header__tel-tooltip']}>
              <span>С 07:00 до 02:00</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className={clsx(styles['main-header'], isScrolled && styles['main-header--fixed'])}>
        <div
          className={clsx(
            styles['main-header__container'],
            isScrolled && styles['main-header__container--fixed'],
            (isOnCatalogBtnClick || onSearchFocus) && styles['main-header--bg-shadow']
          )}
        >
          <div
            className={clsx(
              styles['main-header__btn-bg'],
              isOnCatalogBtnClick && styles['main-header__btn-bg--active']
            )}
          >
            <a className={styles['main-header__logo-btn']} href='/'>
              {' '}
            </a>
            <button
              onClick={() => setIsOnCatalogBtnClick((prevState) => !prevState)}
              className={clsx(
                styles['main-header__catalog-btn'],
                isOnCatalogBtnClick && styles['main-header__catalog-btn--active']
              )}
            >
              Каталог
            </button>
          </div>
          <Catalog catalogRef={catalogRef} isOnCatalogBtnClick={isOnCatalogBtnClick} isScrolled={isScrolled} />
          <div
            ref={searchRef}
            className={clsx(
              styles['main-header__search-wrapper'],
              onSearchFocus && styles['main-header__search-wrapper--focused']
            )}
          >
            <input
              type='text'
              className={styles['main-header__search']}
              placeholder='Поиск по сайту'
              onFocus={() => setOnSearchFocus(true)}
            />
            <button className={styles['main-header__search-btn']}></button>
          </div>
          <nav>
            <ul className={styles['main-header__side-nav']}>
              {sideNavigationItems.map((item) => (
                <li key={item.label} className={styles[item.className]}>
                  <a href='/' className={styles['header-link']}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Auth />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
