import { FC } from 'react';
import styles from './chat.module.scss';
import { useAppSelector } from 'shared/hooks/redux';
import clsx from 'clsx';

const Chat: FC = () => {
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  return chatBtnClicked ? (
    <div className={styles.chat}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>Чат DNS</h2>
        </header>
        <div className={styles.contentWrapper}></div>
        <div className={styles.messagePanel}>
          <div className={styles.drop}>
            <button className={clsx(styles.dropBtn, styles.btns)}></button>
          </div>
          <form action='' className={styles.messageForm}>
            <input type='text' placeholder='Введите сообщение...' className={styles.input} />
            <button className={clsx(styles.sendBtn, styles.btns)}></button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
