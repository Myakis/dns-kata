import { FC, useState } from 'react';
import clsx from 'clsx';

import Layout from 'pages/layout';
import HelpNav from 'features/help-nav';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { readmeOl } from './constants';
import style from './style.module.scss';

const FeedbackPage: FC = () => {
  const [modalOpen, setModalOpen] = useState('');

  const renderOl = (data: { title: string; bold: boolean }[]) => {
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

  // const modalClass = (state: string) => {
  //   if (state === 'up') {
  //     return
  //   }
  // }

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
            <ol>{renderOl(readmeOl)}</ol>
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
                className={clsx(
                  style.form_modalBtn,
                  modalOpen === 'down' ? style.btnDown : null,
                  modalOpen === 'up' ? style.btnUp : null
                )}
                onClick={(e) => handleOpenModal(e)}
              >
                <span className={style.modalBtn_text}>Не выбрано</span>
                <span
                  className={clsx(
                    style.modalBtn_icon,
                    modalOpen === 'down' ? style.iconDown : null,
                    modalOpen === 'up' ? style.iconUp : null
                  )}
                ></span>
              </span>
              <div
                className={clsx(
                  style.form_modalBlock,
                  modalOpen === 'down' ? style.modalDown : null,
                  modalOpen === 'up' ? style.modalUp : null
                )}
                ref={modalRef}
              >
                {modalOpen}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
