/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import style from './style.module.scss';

const ShareTooltip: React.FC = () => {
  const [panel, setPanel] = useState(false);

  return (
    <div className={style['share']}>
      <button
        className={`${style['share__button']} ${style['icon']}`}
        onClick={() => setPanel((panel) => !panel)}
      ></button>
      {panel && (
        <div className={style['share__block']}>
          <ul className={style['share__list']}>
            <li className={style['share__item']}>
              <a className={`${style['share__link']} ${style['share__link_vk']}`} href='#'>
                Вконтакте
              </a>
            </li>
            <li className={style['share__item']}>
              <a className={`${style['share__link']} ${style['share__link-ok']}`} href='#'>
                Одноклассники
              </a>
            </li>
            <li className={style['share__item']}>
              <a className={`${style['share__link']} ${style['share__link-copy']}`} href='#'>
                Скопировать ссылку
              </a>
            </li>
            <li className={style['share__item']}>
              <a className={`${style['share__link']} ${style['share__link-other']}`} href='#'>
                Другие способы
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareTooltip;
