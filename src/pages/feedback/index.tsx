import { FC, useState } from 'react';
import clsx from 'clsx';

import { feedbaackMessage, feedbackThemes } from './constants';
import FeedbackForm from 'features/feedback-form';
import HelpNav from 'features/help-nav';
import FeedbackModal from 'features/feedback-modal';
import Layout from 'pages/layout';

import style from './style.module.scss';

const FeedbackPage: FC = () => {
  const [currentChapter, setCurrentChapter] = useState('');

  const messageRules = (dataText: { title: string; bold: boolean }[]) => {
    return dataText.map((item, index) => {
      return (
        <li key={index} className={clsx(item.bold ? style.liBold : null)}>
          {item.title}
        </li>
      );
    });
  };

  return (
    <Layout pageTitle='Обратная связь'>
      <div className={style.page}>
        <HelpNav />
        <div className={style.feedback}>
          <div className={style.feedback_message}>
            <h2>Уважаемые клиенты!</h2>
            <p>
              В целях оперативного рассмотрения ваших обращений просим максимально точно изложить суть вопроса и
              имеющиеся факты.
            </p>
            <ol>{messageRules(feedbaackMessage)}</ol>
            <p>Чтобы заполнить форму обращения, пожалуйста, выберите раздел.</p>
            <div className={style.blueBg}>
              <p>
                <b>Нашли ошибку на сайте?</b> Выделите текст с ошибкой, нажмите Ctrl+Enter и напишите нам.
              </p>
            </div>
          </div>
          <div className={style.feedback_form}>
            <h3>Выберите раздел</h3>
            <div className={style.form_theme}>
              <FeedbackModal data={feedbackThemes} currentState={currentChapter} setCurrentState={setCurrentChapter} />
            </div>
            <FeedbackForm dataThemes={feedbackThemes} currentChapter={currentChapter} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
