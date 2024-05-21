import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { useAppSelector } from 'shared/hooks/redux';
import { feedbaackMessage, feedbackTheme, cityCollection } from './constants';
import { FeedbackForm } from './types';

import HelpNav from 'features/help-nav';
import ModalFeedback from 'features/modal-feedback';
import Layout from 'pages/layout';

import style from './style.module.scss';

const FeedbackPage: FC = () => {
  const stateCity = useAppSelector((state) => state.currentCity.name);
  const [currentTheme, setCurrentTheme] = useState('');
  const [currentCity, setCurrentCity] = useState('' || stateCity);
  const [fileModal, setFileModal] = useState(false);
  const [drugActive, setDragActive] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FeedbackForm>();

  useEffect(() => {
    reset();
    setValue('theme', '');
  }, [currentTheme, reset, setValue]);

  const renderMessageList = (dataText: { title: string; bold: boolean }[]) => {
    return dataText.map((item) => {
      return (
        <li key={self.crypto.randomUUID()} className={clsx(item.bold ? style.liBold : null)}>
          {item.title}
        </li>
      );
    });
  };

  const renderRadioButtons = (dataBtns: { theme: string; sections: string[] }[]) => {
    const theme = dataBtns.find((item) => item.theme === currentTheme);

    return theme?.sections.map((item) => {
      return (
        <div key={self.crypto.randomUUID()} className={style.form_radio}>
          <label>
            <input type='radio' value={item} id={`theme-${item}`} {...register('theme', {})} />
            {item}
          </label>
        </div>
      );
    });
  };

  const renderUploadFiles = (watch: any = {}) => {
    const result = Object.keys(watch).map((item) => watch[item].name);

    return result.join(', ');
  };

  const handleUploadDrug = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleUploadLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUploadDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    setValue('photo', e.dataTransfer.files);
  };

  const handleUloadClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue('photo', null);
  };

  const renderMainForm = (formTheme: string, dataTheme: { theme: string; sections: string[] }[]) => {
    const sectionsTheme = dataTheme.find((item) => item.theme === currentTheme);

    if (currentTheme && (!sectionsTheme?.sections.length || formTheme)) {
      return (
        <>
          <div className={style.form_message}>
            <textarea
              id=''
              placeholder='Текст сообщения'
              {...register('message', {
                required: 'сообщение обязательно',
              })}
            ></textarea>
            <input
              type='text'
              placeholder='Имя'
              {...register('name', {
                required: 'имя обязательно',
                minLength: { value: 3, message: 'минимум 3 символа' },
                maxLength: { value: 30, message: 'максимум 30 символов' },
              })}
            />
            <input
              type='text'
              placeholder='Адрес эл. почты'
              {...register('email', {
                required: 'email обязателен',
                pattern: { value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, message: 'неверная почта' },
                maxLength: { value: 30, message: 'максимум 30 символов' },
              })}
            />
            <input
              type='text'
              placeholder='Телефон'
              {...register('phone', {
                required: 'телефон обязателен',
                pattern: {
                  value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
                  message: 'неверный номер',
                },
              })}
            />
          </div>
          <div className={style.form_error}>
            {errors.email && <p className={style.inputInvalid}>{errors.email.message}</p>}
            {errors.message && <p className={style.inputInvalid}>{errors.message.message}</p>}
            {errors.name && <p className={style.inputInvalid}>{errors.name.message}</p>}
            {errors.phone && <p className={style.inputInvalid}>{errors.phone.message}</p>}
          </div>
          <div className={style.form_city}>
            <ModalFeedback data={cityCollection} currentState={currentCity} setCurrentState={setCurrentCity} />
          </div>
          <div className={style.form_upload}>
            <div
              className={clsx(style.upload, drugActive && style.uploadDrug)}
              onDragEnter={handleUploadDrug}
              onDragOver={handleUploadDrug}
              onDragLeave={handleUploadLeave}
              onDrop={handleUploadDrop}
            >
              <i></i>
              <p>
                Перетащите файлы, или&#32;
                <label className={style.inputFile}>
                  {!watch('photo') ? (
                    'выберите на компьютере'
                  ) : (
                    <>
                      {renderUploadFiles(watch('photo'))}
                      <button className={style.clearBtn} onClick={handleUloadClear}>
                        Очистить
                      </button>
                    </>
                  )}
                  <input type='file' multiple {...register('photo')} />
                </label>
              </p>
            </div>
            <div className={style.attachment}>
              <p>Требования к файлам</p>
              <i
                className={style.attachment_icon}
                onMouseOver={() => setFileModal(true)}
                onMouseOut={() => setFileModal(false)}
                onFocus={() => setFileModal(true)}
                onBlur={() => setFileModal(false)}
              ></i>
              {fileModal && (
                <div className={style.attachment_note}>
                  Общий объем файлов не должен превышать 240 МБ. и кол.документов не более 15. Форматы: doc, docx, xls,
                  xlsx, txt, pdf, jpeg, jpg, png.
                </div>
              )}
            </div>
          </div>
          <button className={style.form_submit} type='submit'>
            Отправить обращение
          </button>
          <div className={style.form_politics}>
            <p>
              Нажимая кнопку «Отправить», Вы соглашаетесь c <a href='/'>Политикой конфиденциальности</a> и
              <a href='/'>Политикой компании в отношении обработки персональных данных</a> , а также - на получение
              почтовых рассылок рекламного и/или информационного характера.
            </p>
          </div>
        </>
      );
    }
  };

  const onSubmit = (form: any) => {
    reset();
    const resultForm = { ...form, theme: currentTheme + ' ' + form.theme, city: currentCity };

    console.log(resultForm);
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
            <ol>{renderMessageList(feedbaackMessage)}</ol>
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
              <ModalFeedback data={feedbackTheme} currentState={currentTheme} setCurrentState={setCurrentTheme} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderRadioButtons(feedbackTheme)}
              {renderMainForm(watch('theme'), feedbackTheme)}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
