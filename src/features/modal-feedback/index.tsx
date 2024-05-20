import { FC, useState, useEffect } from 'react';

import style from './style.module.scss';
import clsx from 'clsx';
import { useClickOutside } from 'shared/hooks/useClickOutside';

interface IModalFeedback {
  formsData: { theme: string; sections: string[] }[];
  currentTheme: string;
  setCurrentTheme: (form: string) => void;
}

const ModalFeedback: FC<IModalFeedback> = ({ formsData, currentTheme, setCurrentTheme }) => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState('');

  useEffect(() => {
    setModalOpen('');
  }, [currentTheme]);

  const renderFormVers = (data: { theme: string; sections: string[] }[]) => {
    let arr = data;

    if (search) {
      arr = data.filter((item) => item.theme.includes(search));
    }
    return arr.map((item) => {
      return (
        <li key={crypto.randomUUID()}>
          <a
            className={clsx(item.theme === currentTheme ? style.active : null)}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTheme(item.theme);
            }}
            href='/'
          >
            {item.theme}
          </a>
        </li>
      );
    });
  };

  const modalBlockClass = (classDown: string, classUp: string) => {
    return (modalOpen === 'down' ? style[classDown] : null) || (modalOpen === 'up' ? style[classUp] : null);
  };

  const handleOpenModal = (e: any) => {
    const cursorPositionY = window.innerHeight - e.clientY;

    setModalOpen((prevModal) => {
      if (prevModal === '') {
        return cursorPositionY > 300 ? 'down' : 'up';
      }
      return '';
    });
  };

  const modalRef = useClickOutside(() => setModalOpen('')); //как же шикарно

  return (
    <div className={style.form_modal}>
      <span
        className={clsx(style.form_modalBtn, modalBlockClass('btnDown', 'btnUp'))}
        onClick={(e) => handleOpenModal(e)}
      >
        <span className={clsx(style.modalBtn_text, currentTheme ? style.text_black : null)}>
          {currentTheme || 'Не выбрано'}
        </span>
        <span className={clsx(style.modalBtn_icon, modalBlockClass('iconDown', 'iconUp'))}></span>
      </span>

      <div className={clsx(style.form_modalBlock, modalBlockClass('modalDown', 'modalUp'))} ref={modalRef}>
        <div className={style.modal}>
          <div className={style.modal_inputDiv}>
            <input className={style.input} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className={style.modal_ulDiv}>
            <ul>{renderFormVers(formsData)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFeedback;
