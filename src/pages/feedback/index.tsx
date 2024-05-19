import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import Layout from 'pages/layout';
import HelpNav from 'features/help-nav';
import ModalFeedback from 'features/modal-feedback';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { readmeOl, formVersion, cityCollection } from './constants';
import style from './style.module.scss';

type FormTypes = {
  theme: string;
  name: string;
  email: string;
  phone: number;
  message: string;
};

const FeedbackPage: FC = () => {
  const [modalOpen, setModalOpen] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');

  const renderTextList = (dataText: { title: string; bold: boolean }[]) => {
    return dataText.map((item) => {
      return (
        <li key={self.crypto.randomUUID()} className={clsx(item.bold ? style.olBold : null)}>
          {item.title}
        </li>
      );
    });
  };

  const handleOpenModal = (e: any) => {
    const cursorPositionY = window.innerHeight - e.clientY;

    setModalOpen((prevModal) => {
      if (prevModal === '') {
        return cursorPositionY > 400 ? 'down' : 'up';
      }
      return '';
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormTypes>({ mode: 'onBlur' });

  useEffect(() => {
    setModalOpen('');
    setValue('theme', '');
  }, [currentTheme]);

  const modalBlockClass = (classDown: string, classUp: string) => {
    return (modalOpen === 'down' ? style[classDown] : null) || (modalOpen === 'up' ? style[classUp] : null);
  };
  const modalRef = useClickOutside(() => setModalOpen('')); //как же шикарно

  const renderFormBlock = (formVersion: { theme: string; sections: string[] }[]) => {
    const theme = formVersion.find((item) => item.theme === currentTheme);

    return theme?.sections.map((item) => {
      return (
        <div key={self.crypto.randomUUID()} className={style.form_radioBtn}>
          <label>
            <input type='radio' value={item} id={`theme-${item}`} {...register('theme', {})} />
            {item}
          </label>
        </div>
      );
    });
  };

  const onSubmitForm = (form: any) => {
    console.log({ ...form, theme: currentTheme + ' ' + form.theme });
  };

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
            <ol>{renderTextList(readmeOl)}</ol>
            <p>Чтобы заполнить форму обращения, пожалуйста, выберите раздел.</p>
            <div className={style.readme_blueBg}>
              <p>
                <b>Нашли ошибку на сайте?</b> Выделите текст с ошибкой, нажмите Ctrl+Enter и напишите нам.
              </p>
            </div>
          </div>

          <div className={style.feedback_form}>
            <h3>Выберите раздел</h3>
            <div className={style.form_modal}>
              <span
                className={clsx(style.form_modalBtn, modalBlockClass('btnDown', 'btnUp'))}
                onClick={(e) => handleOpenModal(e)}
              >
                <span className={clsx(style.modalBtn_text, currentTheme ? style.text_black : null)}>
                  {currentTheme || 'Не выбрано'}
                </span>
                <span className={clsx(style.modalBtn_icon, modalBlockClass('iconDown', 'iconUp'))}></span>
              </span>

              <div className={clsx(style.form_modalBlock, modalBlockClass('modalDown', 'modalUp'))} ref={modalRef}>
                <ModalFeedback formsData={formVersion} currentForm={currentTheme} setCurrentForm={setCurrentTheme} />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)}>
              {renderFormBlock(formVersion)}
              {watch('theme') && (
                <>
                  <div className={style.form_mainForm}>
                    <textarea
                      id=''
                      placeholder='Текст сообщения'
                      {...register('message', {
                        required: 'required',
                      })}
                    ></textarea>
                    <input
                      type='text'
                      placeholder='Имя'
                      {...register('name', {
                        required: 'required',
                        minLength: { value: 3, message: 'минимум 3 символа' },
                        maxLength: { value: 30, message: 'максимум 30 символов' },
                      })}
                    />
                    <input
                      type='text'
                      placeholder='Адрес эл. почты'
                      {...register('email', {
                        required: 'required',
                        pattern: { value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, message: 'неверная почта' },
                        maxLength: { value: 30, message: 'максимум 30 символов' },
                      })}
                    />
                    <input
                      type='text'
                      placeholder='Телефон'
                      {...register('phone', {
                        required: 'required',
                        pattern: {
                          value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                          message: 'неверный номер',
                        },
                      })}
                    />
                  </div>
                  <button type='submit'>Отправить</button>{' '}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
