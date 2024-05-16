import { HTMLAttributes } from 'react';

interface IDropdownItem {
  label: string;
  address: string;
}

export interface IDropdownMenuProps {
  dropdownItems: IDropdownItem[];
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
