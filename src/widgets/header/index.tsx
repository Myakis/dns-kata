import styles from './header.module.scss';
import classNames from 'classnames';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { navigationLinks, toCustomersLinks, sideNavigationItems } from './constants';
import { useState, useRef, useEffect, FC } from 'react';
import { useCatalog } from 'shared/hooks/useCatalog';
import Subcategories from './subcategories';
import DropdownMenu from 'shared/ui/dropdown-menu';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);
  const [isOnToCustomersBtnClick, setIsOnToCustomersBtnClick] = useState(false);
  const [onSearchFocus, setOnSearchFocus] = useState(false);
  const [onPhoneHover, setOnPhoneHover] = useState(false);

  const iconsUrl = 'src/app/assets/img/header/';
  const catalogRef = useRef<HTMLDivElement>(null);
  const toCustomersDropdownRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { categories, updateSubcategoryItems, activeCategory, subcategoryItems } = useCatalog();

  useClickOutside(catalogRef, () => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);
  // useClickOutside(
  //   toCustomersDropdownRef,
  //   () => setIsOnToCustomersBtnClick(false),
  //   styles['upper-header__to-customers-btn']
  // );
  useClickOutside(searchRef, () => setOnSearchFocus(false));

  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    return () => {
      window.removeEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    };
  }, []);

  // const navigationItems = navigationLinks.map((el, index) =>
  //   el === 'Покупателям' ?        <DropdownMenu
  //     dropdownItems={toCustomersLinks}
  //     toggleName={el}
  //     ulClassName={styles['upper-header__to-customers-dropdown']}
  //     linkClassName={styles['header-link']}
  //     toggleClassname={styles['upper-header__to-customers-btn']}
  //   /> :
  //     <li key={index}>
  //       <a className={styles['header-link']} href='/'>
  //         {el}
  //       </a>
  //     </li>
  //   )
  // );

  const navigationItems = navigationLinks.map((el, index) =>
    el === 'Покупателям' ? (
      <DropdownMenu
        dropdownItems={toCustomersLinks}
        toggleName={el}
        // ulClassName={styles['upper-header__to-customers-dropdown']}
        // linkClassName={styles['header-link']}
        // toggleClassname={styles['upper-header__to-customers-btn']}
      />
    ) : (
      <li key={index}>
        <a className={styles['header-link']} href='/'>
          {el}
        </a>
      </li>
    )
  );

  const mainCategories = categories.map((el, index) => (
    <li key={index} className={styles['main-header__categories-item']}>
      <a
        href='/'
        className={classNames(styles['main-header__categories-link'], styles['header-link'], {
          [styles['main-header__categories-link--active']]: activeCategory === el.category,
        })}
        onMouseEnter={(e) => updateSubcategoryItems(e.currentTarget.innerText)}
      >
        <span
          className={styles['main-header__categories-icon']}
          style={{ backgroundImage: `url(${iconsUrl}${el.icon})` }}
        ></span>
        {el.category}
      </a>
    </li>
  ));

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
            className={classNames(styles['main-header__orange-btn'], styles['main-header__btn-bg'], {
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
              {sideNavigationItems.map((item, index) => (
                <li key={index} className={styles[item.className]}>
                  <a href='/' className={styles['header-link']}>
                    {item.label}
                  </a>
                </li>
              ))}
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
              <Subcategories subcategoryItems={subcategoryItems} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
