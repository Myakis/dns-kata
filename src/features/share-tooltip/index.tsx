import { useState, FC } from 'react';

import style from './style.module.scss';

const NewsShare: FC = () => {
  const [shareOpened, setShareOpened] = useState(false);
  const [copyOpened, setCopyOpened] = useState(false);

  const openShare = () => {
    if (!shareOpened) {
      const openModal = () => {
        const evt = () => {
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

  const handleShareVk = () => {
    window.open(`https://vk.com/share.php?url=${location.href}`, 'sharer', 'status=0,toolbar=0,width=650,height=500');
    setShareOpened(false);
  };

  const handleShareOk = () => {
    window.open(
      `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${location.href}%2F`,
      'sharer',
      'status=0,toolbar=0,width=650,height=500'
    );
    setShareOpened(false);
  };

  const handleShareCopy = () => {
    navigator.clipboard.writeText(location.href);
    setCopyOpened(true);
    setShareOpened(false);
    setTimeout(() => setCopyOpened(false), 2000);
  };

  const handleShareOther = () => {
    navigator.share({ url: location.href });
    setShareOpened(false);
  };

  const shareButtons: { handleClick: () => void; cssName: string; text: string }[] = [
    {
      handleClick: handleShareVk,
      cssName: 'share__modal_button_vk',
      text: 'Вконтакте',
    },
    {
      handleClick: handleShareOk,
      cssName: 'share__modal_button-ok',
      text: 'Одноклассники',
    },
    {
      handleClick: handleShareCopy,
      cssName: 'share__modal_button-copy',
      text: 'Скопировать ссылку',
    },
    {
      handleClick: handleShareOther,
      cssName: 'share__modal_button-other',
      text: 'Другие способы',
    },
  ];

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
              {shareButtons.map((item) => {
                return (
                  <li className={style['share__item']} key={self.crypto.randomUUID()}>
                    <button
                      className={`${style['share__modal_button']} ${style[item.cssName]}`}
                      onClick={() => item.handleClick()}
                    >
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {copyOpened && <div className={style['share__copyModal']}>Скопировано!</div>}
    </div>
  );
};

export default NewsShare;
