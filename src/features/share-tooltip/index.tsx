import { useState, FC } from 'react';

import style from './style.module.scss';

const NewsShare: FC = () => {
  const [shareOpened, setShareOpened] = useState(false);
  const [copyOpened, setCopyOpened] = useState(false);

  const openShare = (): void => {
    if (!shareOpened) {
      const openModal = (): void => {
        const evt = (): void => {
          setShareOpened(false);
          document.body.removeEventListener('click', evt);
        };

        document.body.addEventListener('click', evt);
      };

      setShareOpened(true);
      if (window.innerWidth > 991) {
        setTimeout(() => openModal(), 100);
      }
    }
    return;
  };

  const handleShareVk = (): void => {
    window.open(`https://vk.com/share.php?url=${location.href}`, 'sharer', 'status=0,toolbar=0,width=650,height=500');
    setShareOpened(false);
  };

  const handleShareOk = (): void => {
    window.open(
      `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${location.href}%2F`,
      'sharer',
      'status=0,toolbar=0,width=650,height=500'
    );
    setShareOpened(false);
  };

  const handleShareCopy = (): void => {
    navigator.clipboard.writeText(location.href);
    setCopyOpened(true);
    setShareOpened(false);
    setTimeout(() => setCopyOpened(false), 2000);
  };

  const handleShareOther = (): void => {
    navigator.share({ url: location.href });
    setShareOpened(false);
  };

  return (
    <div className={style['share']}>
      <button className={`${style['share__button']} ${style['icon']}`} onClick={openShare}></button>
      {shareOpened && (
        <>
          <div className={style['mobile__background']} onClick={() => setShareOpened(false)}></div>
          <div className={style['share__block']}>
            <div className={style['share__mobile']}>
              <p className={style['share__mobile--title']}>Поделиться</p>
              <button className={style['shere__mobile--button']} onClick={() => setShareOpened(false)}></button>
            </div>
            <ul className={style['share__list']}>
              <li className={style['share__item']}>
                <button
                  className={`${style['share__modal_button']} ${style['share__modal_button_vk']}`}
                  onClick={() => handleShareVk()}
                >
                  Вконтакте
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  className={`${style['share__modal_button']} ${style['share__modal_button-ok']}`}
                  onClick={() => handleShareOk()}
                >
                  Одноклассники
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  className={`${style['share__modal_button']} ${style['share__modal_button-copy']}`}
                  onClick={() => handleShareCopy()}
                >
                  Скопировать ссылку
                </button>
              </li>
              <li className={style['share__item']}>
                <button
                  className={`${style['share__modal_button']} ${style['share__modal_button-other']}`}
                  onClick={() => handleShareOther()}
                >
                  Другие способы
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
      {copyOpened && <div className={style['share__copyModal']}>Скопировано!</div>}
    </div>
  );
};

export default NewsShare;
