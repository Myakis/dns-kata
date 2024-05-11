import styles from './subcategories.module.scss';
import classNames from 'classnames';
import { getPureInnerText } from 'shared/utils/pure-inner-text-utils';
import { CatalogItem } from '../constants';
import { useState, MouseEvent, FC } from 'react';

interface IProps {
  subcategoryItems: CatalogItem[];
}

const Subcategories: FC<IProps> = ({ subcategoryItems }) => {
  const [onSubcategoryHover, setOnSubcategoryHover] = useState<string>();

  const handleOnSubcategoryHover = (e: MouseEvent<HTMLLIElement>) => {
    const pureSubcategoryName = getPureInnerText(e.currentTarget);
    setOnSubcategoryHover(pureSubcategoryName);
  };

  const renderThirdLevelItem = (el: CatalogItem, index: number) => (
    <li key={index}>
      <a href='/' className={styles['header-link']}>
        {el.subcategory}
        <span className={styles['main-header__subcategories-info']}>{el.itemsCount ? el.itemsCount : null}</span>
      </a>
    </li>
  );

  const renderSecondLevelItem = (el: CatalogItem, index: number) => (
    <li
      key={index}
      className={classNames(styles['main-header__subcategories-item--second'], [
        {
          [styles['main-header__subcategories-item--active']]: onSubcategoryHover === el.subcategory,
        },
      ])}
      onMouseEnter={handleOnSubcategoryHover}
      onMouseLeave={() => setOnSubcategoryHover('')}
    >
      <div className={styles['main-header__subcategories-item-wrapper']}>
        <a href='/' className={classNames(styles['main-header__subcategories-name--second'], styles['header-link'])}>
          {el.subcategory}
          <div className={styles['main-header__subcategories-info']}>
            <span>{el.itemsCount ? el.itemsCount : null}</span>
            <span>{el.items ? '>' : null}</span>
          </div>
        </a>
        {el.subcategory === onSubcategoryHover && el.items ? (
          <ul className={styles['main-header__subcategories--third']}>
            {el.items?.map((el, index) => renderThirdLevelItem(el, index))}
          </ul>
        ) : null}
      </div>
    </li>
  );

  const renderFirstLevelItem = () => {
    return subcategoryItems.map((item: CatalogItem, index: number) => (
      <li key={index}>
        <a className={classNames(styles['main-header__subcategories-name--first'], styles['header-link'])} href='/'>
          {item.subcategory}
        </a>
        <ul className={styles['main-header__subcategories--second']}>
          {item.items?.map((el, index) => renderSecondLevelItem(el, index))}
        </ul>
      </li>
    ));
  };

  const subcategories = renderFirstLevelItem();
  return <ul className={styles['main-header__subcategories--first']}>{subcategories}</ul>;
};

export default Subcategories;
