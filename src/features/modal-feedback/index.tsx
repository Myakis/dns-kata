import { FC, useState } from 'react';

import style from './style.module.scss';
import clsx from 'clsx';

interface IModalFeedback {
  formsData: { theme: string; sections: string[] }[];
  currentForm: string;
  setCurrentForm: (form: string) => void;
}

const ModalFeedback: FC<IModalFeedback> = ({ formsData, currentForm, setCurrentForm }) => {
  const [search, setSearch] = useState('');

  const renderFormVers = (data: { theme: string; sections: string[] }[]) => {
    let arr = data;

    if (search) {
      arr = data.filter((item) => item.theme.includes(search));
    }
    return arr.map((item) => {
      return (
        <li key={crypto.randomUUID()}>
          <a
            className={clsx(item.theme === currentForm ? style.active : null)}
            onClick={(e) => {
              setCurrentForm(item.theme);
              e.preventDefault();
            }}
            href='/'
          >
            {item.theme}
          </a>
        </li>
      );
    });
  };

  return (
    <div className={style.modal}>
      <div className={style.modal_inputDiv}>
        <input className={style.input} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className={style.modal_ulDiv}>
        <ul>{renderFormVers(formsData)}</ul>
      </div>
    </div>
  );
};

export default ModalFeedback;
