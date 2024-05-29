import { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import FeedbackModal from 'features/feedback-modal'; /* оу май гад */
import { cityCollection } from './constants';
import type { TForm, IForm } from './types';

import style from './style.module.scss';

const FeedbackForm: FC<IForm> = ({ dataThemes, currentChapter }) => {
  const stateCity = useAppSelector((state) => state.currentCity.name);
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
  } = useForm<TForm>({ criteriaMode: 'all', defaultValues: { photo: null, chapter: currentChapter } });

  // сброс формы пры изменении раздела
  useEffect(() => {
    reset();
  }, [currentChapter, reset]);

  const radioThemesBtn = (dataBtns: { theme: string; sections: string[] }[]) => {
    const theme = dataBtns.find((item) => item.theme === currentChapter);

    return theme?.sections.map((item, index) => {
      return (
        <div key={index} className={style.form_radio}>
          <label>
            <input type='radio' value={item} {...register('theme', {})} />
            {item}
          </label>
        </div>
      );
    });
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

  // вывод названий файлов в виде кнопки
  const uploadFilesBtn = (photo: object | any) => {
    if (!photo) {
      return 'выберите на компьютере';
    }

    const fileNames = Object.keys(photo)
      .map((item) => photo[item].name)
      .join(', ');

    return (
      <>
        {fileNames}
        <button className={style.clearBtn} onClick={handleUloadClear}>
          Очистить
        </button>
      </>
    );
  };

  // вывод ошибок формы
  const inputErrors = (errors: any) => {
    const res: string[] = Object.keys(errors).map((item) => errors[item].message);

    return res.join(', ');
  };

  const onSubmit = (form: TForm) => {
    console.log({ ...form, city: currentCity });
    reset({}, { keepDefaultValues: true });
  };

  const dataCurrentTheme = dataThemes.find((item) => item.theme === currentChapter);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {radioThemesBtn(dataThemes)}

      {currentChapter && (!dataCurrentTheme?.sections.length || watch('theme')) && (
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

          <div className={clsx(style.form_error, !Object.keys(errors).length && style.dspl_none)}>
            {inputErrors(errors)}
          </div>

          <div className={style.form_city}>
            <FeedbackModal data={cityCollection} currentState={currentCity} setCurrentState={setCurrentCity} />
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
                  {uploadFilesBtn(watch('photo'))}
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
      )}
    </form>
  );
};

export default FeedbackForm;
