import { FC, useState, useEffect } from 'react';
import clsx from 'clsx';

import { useClickOutside } from 'shared/hooks/useClickOutside';

import style from './style.module.scss';

interface IModalFeedback {
  data: { theme: string; sections: string[] }[] | string[];
  currentState: string;
  setCurrentState: (form: string) => void;
}

const ModalFeedback: FC<IModalFeedback> = ({ data, currentState, setCurrentState }) => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState('');

  useEffect(() => {
    setModalOpen('');
  }, [currentState]);

  const renderListItems = (data: { theme: string; sections: string[] }[] | string[]) => {
    let res = data.map((item) => {
      if (typeof item === 'object') {
        return item.theme;
      }
      return item;
    });

    if (search) {
      res = res.filter((item) => item.includes(search));
    }

    return res.map((item) => {
      return (
        <li key={crypto.randomUUID()}>
          <a
            className={clsx(item === currentState ? style.active : null)}
            onClick={(e) => {
              e.preventDefault();
              setCurrentState(item);
            }}
            href='/'
          >
            {item}
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
        <span className={clsx(style.modalBtn_text, currentState ? style.text_black : null)}>
          {currentState || 'Не выбрано'}
        </span>
        <span className={clsx(style.modalBtn_icon, modalBlockClass('iconDown', 'iconUp'))}></span>
      </span>

      <div className={clsx(style.form_modalMenu, modalBlockClass('modalDown', 'modalUp'))} ref={modalRef}>
        <div className={style.modal}>
          <div className={style.modal_inputDiv}>
            <input className={style.input} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className={style.modal_ulDiv}>
            <ul>{renderListItems(data)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFeedback;
