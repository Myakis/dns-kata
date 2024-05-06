import styles from './header.module.scss';
import { useState, useRef, MouseEvent } from 'react';
import { useCatalog } from 'shared/hooks/useCatalog';
import { CatalogItem } from './types';
import classNames from 'classnames';

export const useHeaderConstants = () => {
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

  const handleScroll = () => {
    const scrollValue = 50;
    setIsScrolled(window.scrollY > scrollValue);
  };

  const handleOnCatalogBtnClick = () => {
    setIsOnCatalogBtnClick((prevState) => !prevState);
  };

  const handleOnCategoryHover = (e: MouseEvent<HTMLAnchorElement>) => {
    updateSubcategoryItems(e.currentTarget.innerText);
  };

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

  const handleOnSearchFocus = () => {
    setOnSearchFocus(true);
  };

  const navigationLinks: string[] = ['Акции', 'Магазины', 'Покупателям', 'Физическим лицам', 'Клуб DNS', 'Вакансии'];

  const toCustomersLinks: string[] = [
    'Доставка',
    'Бонусная программа',
    'Узнать статус заказа',
    'Обмен, возврат, гарантия',
    'Кредиты',
    'Сервисные центры',
  ];

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
        onMouseEnter={handleOnCategoryHover}
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

  return {
    handleOnCatalogBtnClick,
    handleScroll,
    handleOnSearchFocus,
    setIsOnCatalogBtnClick,
    setIsOnToCustomersBtnClick,
    setOnSearchFocus,
    subcategories,
    mainCategories,
    navigationItems,
    isOnToCustomersBtnClick,
    isOnCatalogBtnClick,
    isScrolled,
    onSearchFocus,
    catalogRef,
    toCustomersPopupRef,
    searchRef,
  };
};
