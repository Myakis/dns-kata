import { FC, useRef, useState, useEffect } from 'react';
import styles from './chat.module.scss';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import { asideHelperBtnsSlice } from 'shared/store/slices/aside-helper-btns-slice';
import { issueBtnsContent, startMessageContent } from './constants';
import dnsAvatar from '../../app/assets/img/chat/chat-avatar.png';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { useOnEscBtn } from 'shared/hooks/useOnEscBtn';

interface IMessage {
  id: string;
  text: string;
  timestamp: string;
}

const Chat: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const { chatBtn } = asideHelperBtnsSlice.actions;
  const dispatch = useAppDispatch();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newMessage: IMessage = {
        id: uuidv4(),
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  // Узнаем ширину окна
  const windowWidth = useWindowWidth();

  const chatRef = useOnEscBtn(() => dispatch(chatBtn(false)));

  // Если чат открыт и ширина окна меньше 990, то убираем скролл страницы
  useEffect(() => {
    const overflowStyle = chatBtnClicked && windowWidth < 990 ? 'hidden' : 'auto';
    document.body.style.overflow = overflowStyle;
  }, [chatBtnClicked, windowWidth]);

  // Прокрутка вниз чата при его открытии и при написании сообщения
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, chatBtnClicked]);

  const startDnsMessage = (
    <div className={styles.startMessage}>
      <div className={styles.dnsText}>{startMessageContent}</div>
      <ul className={styles.issuesList}>
        {issueBtnsContent.map((el: { label: string; name: string }) => (
          <li className={styles.item} key={el.name}>
            <button className={styles.btn}>{el.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const dnsMessage = (
    <div className={styles.dnsMessage}>
      <img className={styles.avatar} src={dnsAvatar} alt='dns-avatar' />
      <div className={styles.message}>{startDnsMessage}</div>
    </div>
  );

  const userMessage = messages.map((message) => (
    <div key={message.id} className={styles.userMessage}>
      <p className={styles.userText}>{message.text}</p>
      <span className={styles.time}>{message.timestamp}</span>
    </div>
  ));

  return (
    <div className={styles.chat} ref={chatRef}>
      <div className={clsx(styles.modal, chatBtnClicked ? styles.active : styles.disabled)}>
        <header className={styles.modalHeader}>
          <h2>Чат DNS</h2>
          <button
            className={clsx(styles.btns, styles.mobileExitBtn, windowWidth < 990 ? styles.active : styles.disabled)}
            onClick={() => dispatch(chatBtn(!chatBtnClicked))}
          >
            <i></i>
          </button>
        </header>
        <div className={styles.contentWrapper} ref={chatContentRef}>
          {dnsMessage}
          {userMessage}
        </div>
        <div className={styles.sendPanel}>
          <div className={styles.drop}>
            <button className={clsx(styles.dropBtn, styles.btns)}></button>
          </div>
          <form onSubmit={handleSendMessage} className={styles.form}>
            <input
              type='text'
              placeholder='Введите сообщение...'
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='submit'
              className={clsx(styles.sendBtn, styles.btns, inputValue.length > 0 ? styles.active : styles.disabled)}
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
