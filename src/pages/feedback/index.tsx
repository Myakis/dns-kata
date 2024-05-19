import { FC, useState } from 'react';
import clsx from 'clsx';

import Layout from 'pages/layout';
import HelpNav from 'features/help-nav';
import ModalFeedback from 'features/modal-feedback';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { readmeOl } from './constants';
import style from './style.module.scss';

const FeedbackPage: FC = () => {
  const [modalOpen, setModalOpen] = useState('');
  const [currentForm, setCurrentForm] = useState('');

  const renderReadmeOl = (data: { title: string; bold: boolean }[]) => {
    return data.map((item) => {
      return (
        <li key={self.crypto.randomUUID()} className={clsx(item.bold ? style.olBold : null)}>
          {item.title}
        </li>
      );
    });
  };

  const handleOpenModal = (e: any) => {
    const clickY = window.innerHeight - e.clientY;

    setModalOpen((prevModal) => {
      if (prevModal === '') {
        return clickY > 400 ? 'down' : 'up';
      }
      return '';
    });
  };

  const applyClasses = (classDown: string, classUp: string) => {
    return (modalOpen === 'down' ? style[classDown] : null) || (modalOpen === 'up' ? style[classUp] : null);
  };

  const modalRef = useClickOutside(() => setModalOpen('')); // о боже какой же крутой это хук

  return (
    <Layout pageTitle='Обратная связь'>
      <div className={style.page}>
        <HelpNav />

        <div className={style.feedback}>
          <div className={style.feedback_readme}>
            <h2>Уважаемые клиенты!</h2>
            <p>
              В целях оперативного рассмотрения ваших обращений просим максимально точно изложить суть вопроса и
              имеющиеся факты.
            </p>
            <ol>{renderReadmeOl(readmeOl)}</ol>
            <p>Чтобы заполнить форму обращения, пожалуйста, выберите раздел.</p>
            <div className={style.readme_blueBg}>
              <p>
                <b>Нашли ошибку на сайте?</b> Выделите текст с ошибкой, нажмите Ctrl+Enter и напишите нам.
              </p>
            </div>
          </div>

          <div className={style.feedback_form}>
            <h3>Выберите раздел</h3>
            <div className={style.modal}>
              <span
                className={clsx(style.form_modalBtn, applyClasses('btnDown', 'btnUp'))}
                onClick={(e) => handleOpenModal(e)}
              >
                <span className={clsx(style.modalBtn_text, currentForm ? style.text_black : null)}>
                  {currentForm || 'Не выбрано'}
                </span>
                <span className={clsx(style.modalBtn_icon, applyClasses('iconDown', 'iconUp'))}></span>
              </span>

              <div className={clsx(style.form_modalBlock, applyClasses('modalDown', 'modalUp'))} ref={modalRef}>
                <ModalFeedback currentForm={currentForm} setCurrentForm={setCurrentForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
