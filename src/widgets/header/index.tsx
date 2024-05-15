import styles from './header.module.scss';
import classNames from 'classnames';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { navigationLinks, toCustomersLinks, sideNavigationItems } from './constants';
import { useState, useRef, useEffect, FC } from 'react';
import DropdownMenu from 'shared/ui/dropdown-menu';
import Catalog from './component';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);
  const [onSearchFocus, setOnSearchFocus] = useState(false);
  const [onPhoneHover, setOnPhoneHover] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Действия при клике вне блока
  useClickOutside(catalogRef, () => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);
  useClickOutside(searchRef, () => setOnSearchFocus(false));

  // useEffect для фиксации хедера при скролле
  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    return () => {
      window.removeEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    };
  }, []);

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
            className={classNames(styles['main-header__btn-bg'], {
              [styles['main-header__btn-bg--active']]: isOnCatalogBtnClick,
            })}
          >
            <a className={styles['main-header__logo-btn']} href='/'>
              &nbsp;
            </a>
            <button
              onClick={() => setIsOnCatalogBtnClick((prevState) => !prevState)}
              className={classNames(styles['main-header__catalog-btn'], {
                [styles['main-header__catalog-btn--active']]: isOnCatalogBtnClick,
              })}
            >
              Каталог
            </button>
          </div>
          <Catalog catalogRef={catalogRef} isOnCatalogBtnClick={isOnCatalogBtnClick} isScrolled={isScrolled} />
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
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
