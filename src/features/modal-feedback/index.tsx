import { FC, useState } from 'react';

import style from './style.module.scss';
import { formVersion } from './constants/forms';
import clsx from 'clsx';

interface IModalFeedback {
  currentForm: string;
  setCurrentForm: (form: string) => void;
}

const ModalFeedback: FC<IModalFeedback> = ({ currentForm, setCurrentForm }) => {
  const [search, setSearch] = useState('');

  const renderFormVers = (data: string[]) => {
    let arr = data;

    if (search) {
      arr = data.filter((item) => item.includes(search));
    }
    return arr.map((item) => {
      return (
        <li key={crypto.randomUUID()}>
          <a
            className={clsx(item === currentForm ? style.active : null)}
            onClick={(e) => {
              setCurrentForm(item);
              e.preventDefault();
            }}
            href='/'
          >
            {item}
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
        <ul>{renderFormVers(formVersion)}</ul>
      </div>
    </div>
  );
};

export default ModalFeedback;
