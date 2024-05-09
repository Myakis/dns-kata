import styles from './header.module.scss';
import classNames from 'classnames';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { navigationLinks, toCustomersLinks, sideNavigationItems, CatalogItem } from './constants';
import { useState, useRef, MouseEvent, useEffect } from 'react';
import { useCatalog } from 'shared/hooks/useCatalog';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);
  const [isOnToCustomersBtnClick, setIsOnToCustomersBtnClick] = useState(false);
  const [onSubcategoryHover, setOnSubcategoryHover] = useState<string>();
  const [onSearchFocus, setOnSearchFocus] = useState(false);

  const iconsUrl = 'src/app/assets/images/header/';
  const catalogRef = useRef<HTMLDivElement>(null);
  const toCustomersPopupRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { categories, subcategoryItems, updateSubcategoryItems, activeCategory } = useCatalog();

  const handleOnSubcategoryHover = (e: MouseEvent<HTMLAnchorElement>) => {
    const pureSubcategoryName = e.currentTarget.innerText
      .split(' ')
      .map((el) =>
        el
          .split('')
          .filter((el) => /^[а-яА-Я]+$/.test(el))
          .join('')
      )
      .join(' ');
    setOnSubcategoryHover(pureSubcategoryName);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    return () => {
      window.removeEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
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

  const navigationItems = navigationLinks.map((el, index) =>
    el === 'Покупателям' ? (
      <li key={index}>
        <button
          className={classNames(styles['header-link'], styles['upper-header__to-customers-btn'], {
            [styles['upper-header__to-customers-btn--active']]: isOnToCustomersBtnClick,
          })}
          onClick={() => setIsOnToCustomersBtnClick(!isOnToCustomersBtnClick)}
        >
          {el}
          <span></span>
        </button>
        {isOnToCustomersBtnClick ? (
          <ul className={styles['upper-header__to-customers-popup']} ref={toCustomersPopupRef}>
            {toCustomersLinks.map((el, index) => (
              <li key={index}>
                <a className={styles['header-link']}>{el}</a>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    ) : (
      <li key={index}>
        <a className={styles['header-link']}>{el}</a>
      </li>
    )
  );

  const mainCategories = categories.map((el, index) => (
    <li key={index} className={styles['main-header__categories-item']}>
      <a
        href=''
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

  const renderThirdLevelItem = (el: CatalogItem, index: number) => (
    <li key={index}>
      <a href='' className={styles['header-link']}>
        {el.subcategory}
        <span className={styles['main-header__subcategories-info']}>{el.itemsCount ? el.itemsCount : null}</span>
      </a>
    </li>
  );

  const renderSecondLevelItem = (el: CatalogItem, index: number) => (
    <li key={index} className={styles['main-header__subcategories-item--second']}>
      <a
        className={classNames(styles['main-header__subcategories-name--second'], styles['header-link'])}
        onMouseEnter={handleOnSubcategoryHover}
        onMouseLeave={() => setOnSubcategoryHover('')}
      >
        {el.subcategory}
        <div className={styles['main-header__subcategories-info']}>
          <span>{el.itemsCount ? el.itemsCount : null}</span>
          <span>{el.items ? '>' : null}</span>
          {el.subcategory === onSubcategoryHover && el.items ? (
            <ul className={styles['main-header__subcategories--third']}>
              {el.items?.map((el, index) => renderThirdLevelItem(el, index))}
            </ul>
          ) : null}
        </div>
      </a>
    </li>
  );

  const renderFirstLevelItem = () => {
    return subcategoryItems.map((item: CatalogItem, index: number) => (
      <li key={index}>
        <a className={classNames(styles['main-header__subcategories-name--first'], styles['header-link'])}>
          {item.subcategory}
        </a>
        <ul className={styles['main-header__subcategories--second']}>
          {item.items?.map((el, index) => renderSecondLevelItem(el, index))}
        </ul>
      </li>
    ));
  };

  const subcategories = renderFirstLevelItem();

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
                  <a href='' className={styles['header-link']}>
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
              <ul className={styles['main-header__subcategories--first']}>{subcategories}</ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
