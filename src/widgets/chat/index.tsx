import { FC, useState } from 'react';
import styles from './chat.module.scss';
import classNames from 'classnames';

const Chat: FC = () => {
  const [isChatBtnClicked, setIsChatBtnClicked] = useState(false);
  return (
    <>
      <div className={styles.chatContainer}>
        <button
          className={classNames(
            styles.chatToggle,
            { [styles.chatToggleClosed]: !isChatBtnClicked },
            { [styles.chatToggleOpened]: isChatBtnClicked }
          )}
          onClick={() => setIsChatBtnClicked((prevState) => !prevState)}
        ></button>
        {isChatBtnClicked ? (
          <div className={styles.chatModal}>
            <div className={styles.chatHeader}>
              <h2>Чат DNS</h2>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Chat;
