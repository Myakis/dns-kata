import { useClickOutside } from 'shared/hooks/useClickOutside';
import { FC, HTMLAttributes, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './dropdown-menu.module.scss';

interface IProps {
  dropdownItems: any[];
  toggleName: string;
  ulClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  toggleClassname?: string;
  ulAttributes?: HTMLAttributes<HTMLUListElement> | React.RefObject<HTMLUListElement> | undefined;
  itemAttributes?: HTMLAttributes<HTMLLIElement>;
  linkAttributes?: HTMLAttributes<HTMLAnchorElement>;
}

const DropdownMenu: FC<IProps> = ({
  dropdownItems,
  toggleName,
  ulClassName,
  itemClassName,
  linkClassName,
  ulAttributes,
  itemAttributes,
  linkAttributes,
  toggleClassname,
}) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useClickOutside(
    dropdownRef,
    () => {
      setIsDropdownOpened(false);
    },
    toggleClassname
  );

  return (
    <div>
      <button
        className={classNames(styles.dropdownToggle, toggleClassname, { [styles.toggleActive]: isDropdownOpened })}
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}
      >
        {toggleName}
        <span></span>
      </button>
      <ul
        style={{ display: isDropdownOpened ? 'block' : 'none' }}
        className={classNames(styles.dropdownList, ulClassName)}
        {...ulAttributes}
        ref={dropdownRef}
      >
        {dropdownItems.map((el, index) => (
          <li key={index} className={itemClassName} {...itemAttributes}>
            <a className={linkClassName} href='/' {...linkAttributes}>
              {el}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;

{
  /* <DropdownMenu
  items={toCustomersDropdownItems}
  itemClassName={styles['upper-header__to-customers-dropdown']}
  linkClassName={styles['header-link']}
  ulAttributes={{ id: 'dropdown-menu', role: 'navigation' }}
  linkAttributes={{ target: '_blank' }}
/>; */
}
