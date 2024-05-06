/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import style from './style.module.scss';

const ShareTooltip: React.FC = () => {
  const [shareModal, setShareModal] = useState(false);

  const clickButtonShare = (): void => {
    if (!shareModal) {
      const eventShareModal = (): void => {
        const event = (): void => {
          setShareModal(false);
          document.body.removeEventListener('click', event);
        };

        document.body.addEventListener('click', event);
      };

      setShareModal(true);
      if (window.innerWidth > 991) {
        setTimeout(() => eventShareModal(), 100);
      }
    }
    return;
  };

  return (
    <div className={style['share']}>
      <button className={`${style['share__button']} ${style['icon']}`} onClick={clickButtonShare}></button>
      {shareModal && (
        <>
          <div className={style['mobile__background']} onClick={() => setShareModal(false)}></div>
          <div className={style['share__block']}>
            <div className={style['share__mobile']}>
              <p className={style['share__mobile--title']}>Поделиться</p>
              <button className={style['shere__mobile--button']} onClick={() => setShareModal(false)}></button>
            </div>
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
        </>
      )}
    </div>
  );
};

export default ShareTooltip;
