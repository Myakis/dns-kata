import { useClickOutside } from 'shared/hooks/useClickOutside';
import { IDropdownMenuProps } from './types';
import { FC, useState } from 'react';
import classNames from 'classnames';
import styles from './dropdown-menu.module.scss';

/**
 * @typedef {Object} DropdownItem
 * @property {string} label - Контент элемента.
 * @property {string} address - Адрес элемента.
 */

/**
 * Пропсы компонента DropdownMenu.
 * @property {DropdownItem[]} dropdownItems - Элементы внутри выпадающего меню.
 * @property {string} [className] - Внешний класс для всего выпадающего меню (указываем и используем вместе с вашим кастомным селектором, если хотите изменить дефолтные стили).
 * @property {string} [listClassName] - Пользовательский класс для списка.
 * @property {HTMLAttributes<HTMLUListElement>} [listAttributes] - Атрибуты для списка.
 * @property {string} [itemClassName] - Пользовательский класс для элемента.
 * @property {HTMLAttributes<HTMLLIElement>} [itemAttributes] - Атрибуты для элемента.
 * @property {string} [linkClassName] - Пользовательский класс для ссылки.
 * @property {HTMLAttributes<HTMLAnchorElement>} [linkAttributes] - Атрибуты для ссылки.
 * @property {string} toggleContent - Содержимое внутри кнопки.
 * @property {string} [toggleClassname] - Пользовательский класс для кнопки.
 * @property {boolean} toggleArrow - Отображать ли стрелку.
 * @property {string} [toggleArrowClassname] - Пользовательский класс для стрелки.
 */

const DropdownMenu: FC<IDropdownMenuProps> = ({
  dropdownItems,
  className,
  listClassName,
  listAttributes,
  itemClassName,
  itemAttributes,
  linkClassName,
  linkAttributes,
  toggleContent,
  toggleClassname,
  toggleArrow,
  toggleArrowClassname,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const dropdownRef = useClickOutside(() => setIsDropdownOpened(false), styles.dropdownToggle);

  return (
    <div className={className}>
      <button
        className={classNames(
          styles.dropdownToggle,
          toggleClassname,
          { [styles.toggleActive]: isDropdownOpened },
          { [styles.toggleArrow]: toggleArrow },
          { [toggleArrowClassname as string]: toggleArrow }
        )}
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}
      >
        {toggleContent}
      </button>
      {isDropdownOpened ? (
        <ul className={classNames(styles.dropdownList, listClassName)} {...listAttributes} ref={dropdownRef}>
          {dropdownItems.map((el, index) => (
            <li key={index} className={itemClassName} {...itemAttributes}>
              <a className={linkClassName} href={el.address} {...linkAttributes}>
                {el.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
