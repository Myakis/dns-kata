import { FC } from 'react';
import styles from './chat.module.scss';
import { useAppSelector } from 'shared/hooks/redux';

const Chat: FC = () => {
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  return chatBtnClicked ? (
    <div className={styles.chatContainer}>
      <div className={styles.chatModal}>
        <header className={styles.chatHeader}>
          <h2>Чат DNS</h2>
        </header>
        <div className={styles.chatContentWrapper}></div>
        <div className={styles.chatMessagePanel}>
          <div className={styles.chatDrop}>
            <button className={styles.dropBtn}></button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
