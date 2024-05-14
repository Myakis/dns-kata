import styles from './catalog.module.scss';
import classNames from 'classnames';
import { getPureInnerText } from 'shared/utils/pure-inner-text-utils';
import { CatalogItem } from '../constants';
import catalog from '../catalog.json';
import { useState, MouseEvent, FC, Ref } from 'react';

interface IProps {
  catalogRef?: Ref<HTMLDivElement>;
  isOnCatalogBtnClick?: boolean;
  isScrolled?: boolean;
}

const Catalog: FC<IProps> = ({ catalogRef, isOnCatalogBtnClick = true, isScrolled = false }) => {
  const { categories } = catalog.catalog;
  const [onSubcategoryHover, setOnSubcategoryHover] = useState<string>();
  const [subcategoryItems, setSubcategoryItems] = useState(categories[0].items);
  const [activeCategory, setActiveCategory] = useState<string>();
  const iconsUrl = 'src/app/assets/img/header/';

  const handleOnCategoryHover = (category: string = 'Бытовая техника') => {
    setActiveCategory(category);
    const selectedCategory = categories.find((el) => el.category === category);

    if (selectedCategory) {
      setTimeout(() => setSubcategoryItems(selectedCategory.items), 400);
    }
  };

  const handleOnSubcategoryHover = (e: MouseEvent<HTMLLIElement>) => {
    const pureSubcategoryName = getPureInnerText(e.currentTarget);

    setOnSubcategoryHover(pureSubcategoryName);
  };

  const renderThirdLevelItem = (el: CatalogItem, index: number) => (
    <li key={index}>
      <a href='/' className={styles['catalog-link']}>
        {el.subcategory}
        <span className={styles['subcategories__info']}>{el.itemsCount ? el.itemsCount : null}</span>
      </a>
    </li>
  );

  const renderSecondLevelItem = (el: CatalogItem, index: number) => (
    <li
      key={index}
      className={classNames(styles['subcategories__item--second'], [
        {
          [styles['subcategories__item--active']]: onSubcategoryHover === el.subcategory,
        },
      ])}
      onMouseEnter={handleOnSubcategoryHover}
      onMouseLeave={() => setOnSubcategoryHover('')}
    >
      <div className={styles['subcategories__item-wrapper']}>
        <a href='/' className={classNames(styles['subcategories__name--second'], styles['catalog-link'])}>
          {el.subcategory}
          <div className={styles['subcategories__info']}>
            <span>{el.itemsCount ? el.itemsCount : null}</span>
            <span>{el.items ? '>' : null}</span>
          </div>
        </a>
        {el.subcategory === onSubcategoryHover && el.items ? (
          <ul className={styles['subcategories--third']}>
            {el.items?.map((el, index) => renderThirdLevelItem(el, index))}
          </ul>
        ) : null}
      </div>
    </li>
  );

  const renderFirstLevelItem = () => {
    return subcategoryItems.map((item: CatalogItem, index: number) => (
      <li key={index}>
        <a className={classNames(styles['subcategories__name--first'], styles['catalog-link'])} href='/'>
          {item.subcategory}
        </a>
        <ul className={styles['subcategories--second']}>
          {item.items?.map((el, index) => renderSecondLevelItem(el, index))}
        </ul>
      </li>
    ));
  };

  const mainCategories = categories.map((el, index) => (
    <li key={index} className={styles['categories__item']}>
      <a
        href='/'
        className={classNames(styles['categories__link'], styles['catalog-link'], {
          [styles['categories__link--active']]: activeCategory === el.category,
        })}
        onMouseEnter={(e) => handleOnCategoryHover(e.currentTarget.innerText)}
      >
        <span className={styles['categories__icon']} style={{ backgroundImage: `url(${iconsUrl}${el.icon})` }}></span>
        {el.category}
      </a>
    </li>
  ));
  const subcategories = renderFirstLevelItem();

  return (
    <div
      ref={catalogRef}
      className={classNames(styles['catalog'], {
        [styles['catalog--closed']]: !isOnCatalogBtnClick,
        [styles['catalog--opened']]: isOnCatalogBtnClick,
        [styles['catalog--fixed']]: isScrolled,
      })}
    >
      <nav className={styles['categories']}>
        <ul>{mainCategories}</ul>
      </nav>
      <nav className={styles['subcategories']}>
        <ul className={styles['subcategories--first']}>{subcategories}</ul>
      </nav>
    </div>
  );
};

export default Catalog;
