import { FC, useState } from 'react';
import clsx from 'clsx';

import { Pages, Links, LinkPageType } from './constants';

import style from './style.module.scss';

const HelpNav: FC = () => {
  const [active, setActive] = useState('dialog');

  const navItems = (data: LinkPageType) => {
    return data.map((item, index) => {
      const itemIcon = item.icon ? style[item.icon] : '';
      const itemActive = active === item.icon ? style.active : null;

      const handlerItem = (e: any) => {
        e.preventDefault();
        if (item.icon) {
          setActive(item.icon);
        }
      };

      return (
        <li key={index}>
          <a className={clsx(itemIcon, itemActive)} onClick={handlerItem} target='' href={item.href}>
            <i></i>
            {item.title}
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <div className={style.helpNav}>
        <div className={style.nav}>
          <div className={style.pages}>
            <ul>{navItems(Pages)}</ul>
          </div>
          <div className={style.links}>
            <ul>{navItems(Links)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpNav;
