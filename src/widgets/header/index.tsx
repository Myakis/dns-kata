import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { useCatalog } from 'shared/hooks/useCatalog';
import { MouseEvent } from 'react';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnCatalogBtnClick, setIsOnCatalogBtnClick] = useState(false);

  const { categories, subcategoryItems, updateSubcategoryItems } = useCatalog();
  const iconsUrl = 'src/app/assets/images/header/';

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

  const handleOnMouseHover = (e: MouseEvent<HTMLAnchorElement>) => {
    updateSubcategoryItems(e.currentTarget.innerText);
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
          >
            <nav className={styles['main-header__categories']}>
              <ul>
                {categories.map((el, index) => (
                  <li key={index} className={styles['main-header__categories-item']}>
                    <a href='' className={styles['main-header__categories-link']} onMouseEnter={handleOnMouseHover}>
                      <span
                        className={styles['main-header__categories-icon']}
                        style={{ backgroundImage: `url(${iconsUrl}${el.icon})` }}
                      ></span>
                      {el.category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className={styles['main-header__subcategories']}>
              <ul className={styles['main-header__subcategories--first']}>
                {subcategoryItems.map((el, index) => (
                  <li key={index}>
                    <a className={styles['main-header__subcategories-name--first']}>{el.subcategory}</a>
                    <ul className={styles['main-header__subcategories--second']}>
                      {el.items.map((el, index) => (
                        <li key={index}>
                          <a className={styles['main-header__subcategories-name--second']}>
                            {el.subcategory}
                            <div className={styles['main-header__subcategories-info--second']}>
                              <span>{el.itemsCount ? el.itemsCount : null}</span>
                              <span>{el.items ? '>' : null}</span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
