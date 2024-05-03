import styles from './header.module.scss';
import { useState, useRef } from 'react';
import { useCatalog } from 'shared/hooks/useCatalog';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import classNames from 'classnames';
import { MouseEvent } from 'react';

export const useHeaderConstants = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);
  const [onSubcategoryHover, setOnSubcategoryHover] = useState<string>();

  const iconsUrl = 'src/app/assets/images/header/';
  const catalogRef = useRef<HTMLDivElement>(null);

  const { categories, subcategoryItems, updateSubcategoryItems, activeCategory } = useCatalog();
  useClickOutside(catalogRef, () => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);

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

  const navigationLinks = [
    {
      linkName: 'stoks',
      content: 'Акции',
    },
    {
      linkName: 'shops',
      content: 'Магазины',
    },
    {
      linkName: 'toBuyer',
      content: 'Покупателям',
    },
    {
      linkName: 'toIndividuals',
      content: 'Физическим лицам',
    },
    {
      linkName: 'dnsClub',
      content: 'Клуб DNS',
    },
    {
      linkName: 'vacancies',
      content: 'Вакансии',
    },
  ];

  const navigationItems = navigationLinks.map((el, index) => (
    <li key={index}>
      <a className={styles['header-link']}>{el.content}</a>
    </li>
  ));

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

  const subcategories = subcategoryItems.map((item, index) => (
    <li key={index}>
      <a className={classNames(styles['main-header__subcategories-name--first'], styles['header-link'])}>
        {item.subcategory}
      </a>
      <ul className={styles['main-header__subcategories--second']}>
        {item.items.map((el, index) => (
          <li key={index} className={styles['main-header__subcategories-item--second']}>
            <a
              className={classNames(styles['main-header__subcategories-name--second'], styles['header-link'])}
              onMouseEnter={handleOnSubcategoryHover}
              onMouseLeave={() => setOnSubcategoryHover('')}
            >
              {el.subcategory}
              <div className={styles['main-header__subcategories-info--second']}>
                <span>{el.itemsCount ? el.itemsCount : null}</span>
                <span>{el.items ? '>' : null}</span>
                {el.subcategory === onSubcategoryHover && el.items ? (
                  <ul className={styles['main-header__subcategories--third']}>
                    {el.items?.map((el, index) => (
                      <li key={index}>
                        <a href='' className={styles['header-link']}>
                          {el.subcategory}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  ));

  return {
    subcategories,
    mainCategories,
    navigationItems,
    handleOnCatalogBtnClick,
    handleScroll,
    catalogRef,
    isOnCatalogBtnClick,
    isScrolled,
  };
};
