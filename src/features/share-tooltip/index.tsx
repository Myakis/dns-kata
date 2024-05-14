import { useState, FC } from 'react';

import style from './style.module.scss';

const NewsShare: FC = () => {
  const [shareModal, setShareModal] = useState(false);

  const clickOpenModal = (): void => {
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
      <button className={`${style['share__button']} ${style['icon']}`} onClick={clickOpenModal}></button>
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
                <button
                  type='button'
                  className={`${style['share__modal_button']} ${style['share__modal_button_vk']}`}
                  onClick={() => {
                    window.open(
                      `https://vk.com/share.php?url=${location.href}`,
                      'sharer',
                      'status=0,toolbar=0,width=650,height=500'
                    );
                  }}
                >
                  Вконтакте
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  type='button'
                  className={`${style['share__modal_button']} ${style['share__modal_button-ok']}`}
                  onClick={() => {
                    window.open(
                      `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${location.href}%2F`,
                      'sharer',
                      'status=0,toolbar=0,width=650,height=500'
                    );
                  }}
                >
                  Одноклассники
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  type='button'
                  className={`${style['share__modal_button']} ${style['share__modal_button-copy']}`}
                  onClick={() => {
                    navigator.clipboard.writeText(location.href);
                  }}
                >
                  Скопировать ссылку
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  type='button'
                  className={`${style['share__modal_button']} ${style['share__modal_button-other']}`}
                  onClick={() => {
                    navigator.share({ url: location.href });
                  }}
                >
                  Другие способы
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsShare;
