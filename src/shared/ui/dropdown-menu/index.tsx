import { useClickOutside } from 'shared/hooks/useClickOutside';
import { FC, HTMLAttributes, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './dropdown-menu.module.scss';
interface IProps {
  dropdownItems: { label: string; address: string }[];
  className?: string;
  listClassName?: string;
  listAttributes?: HTMLAttributes<HTMLUListElement>;
  itemClassName?: string;
  itemAttributes?: HTMLAttributes<HTMLLIElement>;
  linkClassName?: string;
  linkAttributes?: HTMLAttributes<HTMLAnchorElement>;
  toggleContent: string;
  toggleClassname?: string;
  toggleArrow: boolean;
  toggleArrowClassname?: string;
}

const DropdownMenu: FC<IProps> = ({
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
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useClickOutside(
    dropdownRef,
    () => {
      setIsDropdownOpened(false);
    },
    styles.dropdownToggle
  );

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

// dropdownItems - айтемсы внутри downdrop-menu

// className - внешний класс всего dropdown (указываем и используем вместе с вашим кастомным селектором, если хотите изменить дефолтный стиль)

// listClassName - ваш кастомный класс для списка
// listAttributes - атрибуты для списка

// itemClassName - ваш кастомный класс для айтема
// itemAttributes - атрибуты для айтема

// linkClassName - ваш кастомный класс для ссылки
// linkAttributes - атрибуты для ссылки

// toggleContent - контент внутри кнопки
// toggleClassname - ваш кастомный класс для кнопки
// toggleArrow - надо/не надо стрелочку
// toggleArrowClassname - ваш кастомный класс для стрелочки

// Пример:
// <DropdownMenu
// className={styles['dropdown']}
// key={index}
// dropdownItems={toCustomersLinks}
// toggleContent={el.label}
// toggleArrow={true}
// listClassName={styles['dropdown-list']}
// linkClassName={styles['dropdown-link']}
// toggleClassname={styles['dropdown-btn']}
// />
