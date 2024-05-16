import { FC, useRef, useState, useEffect } from 'react';
import styles from './chat.module.scss';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux';
import { helperBtnsSlice } from 'shared/store/slices/helper-btns-slice';
import { issueBtnsContent, startMessageContent } from './constants';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

const Chat: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const { chatBtn } = helperBtnsSlice.actions;
  const dispatch = useAppDispatch();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: uuidv4(),
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    chatBtnClicked && windowWidth < 990
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [chatBtnClicked, windowWidth]);

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
      <img className={styles.avatar} src='src/app/assets/img/chat/chat-avatar.png' />
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
    <div className={styles.chat}>
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
