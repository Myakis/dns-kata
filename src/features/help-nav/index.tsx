import { FC, useState } from 'react';
import clsx from 'clsx';

import { Pages, Links, LinkPageType } from './constants';
import style from './style.module.scss';

const HelpNav: FC = () => {
  const [active, setActive] = useState('dialog');

  const renderNavItems = (data: LinkPageType) => {
    return data.map((item) => {
      const itemIcon = item.icon ? style[item.icon] : '';
      const itemActive = active === item.icon ? style.active : null;
      const handlerItem = () => {
        if (item.icon) {
          setActive(item.icon);
        }
      };

      return (
        <li key={self.crypto.randomUUID()}>
          <a className={clsx(itemIcon, itemActive)} onClick={() => handlerItem()} href={item.href}>
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
            <ul>{renderNavItems(Pages)}</ul>
          </div>
          <div className={style.links}>
            <ul>{renderNavItems(Links)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpNav;
