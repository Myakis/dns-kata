import { FC, useState } from 'react';
import styles from './chat.module.scss';
import { useAppSelector } from 'shared/hooks/redux';
import { issueBtnsContent, startMessageContent } from './constants';
import clsx from 'clsx';

interface Message {
  text: string;
  timestamp: string;
}

const Chat: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const startDnsMessage = (
    <div className={styles.startMessage}>
      <p className={styles.dnsText}>{startMessageContent}</p>
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
      <span className={styles.avatar}></span>
      <div className={styles.message}>{startDnsMessage}</div>
    </div>
  );

  const userMessage = messages.map((message) => (
    <div key={message.timestamp} className={styles.userMessage}>
      <div className={styles.userText}>{message.text}</div>
      <span className={styles.time}>{message.timestamp}</span>
    </div>
  ));

  return chatBtnClicked ? (
    <div className={styles.chat}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>Чат DNS</h2>
        </header>
        <div className={styles.contentWrapper}>
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
            <button type='submit' className={clsx(styles.sendBtn, styles.btns)}></button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
