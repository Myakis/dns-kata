import { useState, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormValues } from 'pages/shopCard/shopCard.types';
import styles from './feedbackForm.module.scss';
import { clsx } from 'clsx';

const FeedbackForm = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const [fileValidation, setFileValidation] = useState<boolean>(true); // Состояние для валидации общего объема файлов ДЛЯ ОСНОВНОГО ЭКРАНА
  const [fileCountValidation, setFileCountValidation] = useState<boolean>(true); // Состояние для валидации количества файлов ДЛЯ ОСНОВНОГО ЭКРАНА
  const [previews, setPreviews] = useState<string[]>([]); //состояние для работы с превьюшками ДЛЯ ОСНОВНОГО ЭКРАНА
  // State для отслеживания полноэкранного режима
  // Состояние для отслеживания добавления класса загрузки к изображению
  const [files, setFiles] = useState<File[]>([]); //состояние для работы с файлами ДЛЯ ОСНОВНОГО ЭКРАНА

  const runAnimation = () => {
    setAnimation(!animation);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  // Функция saveForm выполняет сохранение данных формы и выводит их в консоль,
  // а также обрабатывает прикреплённые файлы, выводя их имена или сообщение об отсутствии файлов.
  // После этого она сбрасывает форму и очищает массивы файлов и предпросмотров. ФУНКЦИЯ ДЛЯ ОСНОВНОГО ЭКРАНА

  const saveForm: SubmitHandler<FormValues> = (data) => {
    const { inputName, inputMail, inputPhone, inputMessage } = data;

    console.log('Имя:', inputName);
    console.log('Почта:', inputMail);
    console.log('Номер телефона:', inputPhone);
    console.log('Сообщение:', inputMessage);
    if (files.length === 0) {
      console.log('Файлы отсутствуют');
    } else {
      files.map((file: File) => console.log('Файл:', file.name));
    }
    reset();
    setFiles([]);
    setPreviews([]);
  };

  // Функция handleFileChange управляет добавлением новых файлов, проверяя их размер и количество.
  // Она обновляет состояния для файлов и их предпросмотров и обрабатывает ошибки валидации,
  // чтобы обеспечить соблюдение установленных ограничений. ДЛЯ ГЛАВНОГО ЭКРАНА

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const totalSize =
      files.reduce((acc, file) => acc + file.size, 0) + newFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 300 * 1024 * 1024; // 300 MB
    const maxFiles = 15;

    if (totalSize <= maxSize && files.length + newFiles.length <= maxFiles) {
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      setFileValidation(true); // Сбрасываем валидацию, если она была отображена
    } else {
      // Обновляем состояние валидации
      if (totalSize > maxSize) {
        setFileValidation(false);
      }
      if (files.length + newFiles.length > maxFiles) {
        setFileCountValidation(false);
      }
    }
  };

  // Функция handleRemoveFile предназначена для удаления файла и соответствующего предпросмотра из списка по заданному индексу.
  // Она принимает один параметр index, который указывает на индекс файла, который необходимо удалить ДЛЯ ОСНОВНОГО ЭКРАНА
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  // Функция formatFileSize предназначена для форматирования размера файла в удобочитаемый формат
  // с соответствующей единицей измерения (байты, килобайты, мегабайты, гигабайты).
  // Она принимает один параметр size, который указывает на размер файла в байтах. ДЛЯ ОСНОВНОГО ЭКРАНА
  const formatFileSize = (size: number) => {
    const units = ['bytes', 'KB', 'MB', 'GB'];
    let adjustedSize = size; // Создаем новую переменную для изменяемого значения
    let index = 0;

    while (adjustedSize >= 1024 && index < units.length - 1) {
      adjustedSize /= 1024;
      index++;
    }
    return `${Math.round(adjustedSize)} ${units[index]}`;
  };

  // JSX элемент, который отображает изображения превью ДЛЯ ОСНОВНОГО ЭКРАНА
  const renderPreviews = () => {
    return previews.map((preview, index) => {
      const fileSize = formatFileSize(files[index].size);
      const fileName = files[index].name;

      return (
        <div key={index}>
          <div className={clsx(styles.filesList__file, styles.ajaxFileUploadFile, styles.file)} data-role='file-sample'>
            <div className={styles.file__preview} data-role='preview'>
              <div className={styles.file__header}>
                <div className={styles.file__size} data-role='size'>
                  {fileSize}
                </div>
                <div
                  className={styles.ajaxFileUploadFile__remove}
                  data-role='remove-button'
                  onClick={() => handleRemoveFile(index)}
                ></div>
              </div>
              <div className={clsx(styles.file__icon, styles.fileIcon)} data-role='icon'>
                <img className={styles.file__image} src={preview} alt={`preview ${index}`} />
              </div>
              <div className={clsx(styles.file__image, styles.file__image_hidden)} data-role='preview-image'></div>
            </div>
            <div
              className={clsx(
                styles.ajaxFileUploadFile__title,
                styles.ajaxFileUploadFile__tile_hidden,
                styles.file__title
              )}
              data-role='title'
              data-filetype='... .'
            >
              {fileName}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.shopPageContent__section} id='shop-feedback'>
      <h2
        className={clsx(
          styles.shopPageContent__title,
          styles.shopPageContent__title_bold,
          styles.shopPageContent__title_small
        )}
      >
        Обратная связь
      </h2>
      <div className={styles.shopFeedbackBlock}>
        <a
          href='!#'
          className={styles.shopFeedbackBlock__spoilerBtn}
          onClick={(event) => {
            event.preventDefault();
            runAnimation();
          }}
        >
          <span>Справочная информация</span>
          <i></i>
        </a>

        <div
          id='shop-feedback-info-block'
          className={clsx(styles.shopFeedbackBlock__info, styles.collapse, { [styles.in]: animation })}
        >
          <p className={styles.shopFeedbackBlock__textBold}>Уважаемые клиенты!</p>
          <p className={styles.shopFeedbackBlock__textBold}>
            В целях оперативного рассмотрения ваших обращений просим максимально точно изложить суть вопроса и имеющиеся
            факты.
          </p>
          <p className={styles.shopFeedbackBlock__text_small}>
            1. Адрес магазина и/или сервисного центра;
            <br />
            2. Время описываемых событий;
            <br />
            3. Имена и/или фамилии сотрудников компании;
            <br />
            4. Номер оформленного заказа на покупку товара;
            <br />
            5. Номер документа на сервисное обслуживание;
            <br />
            6. Наименование товара.
            <br />
          </p>
          <p className={styles.shopFeedbackBlock__text_small}>
            Благодарим вас за сотрудничество и конструктивную обратную связь о работе нашей компании.
          </p>
        </div>
        <div id='shop-feedback-form-wrap' className={styles.shopFeedbackBlock__form}>
          <form id='ticket-create-form' onSubmit={handleSubmit(saveForm)}>
            <div className={styles.shopFeedbackBlock__short_fields}>
              <div
                className={clsx(
                  styles.formGroup,
                  styles.fieldTicketcreateformUsername,
                  errors.inputName && styles.hasError
                )}
              >
                <input
                  type='text'
                  id='ticketcreateform-username'
                  className={styles.formControl}
                  {...register('inputName', { required: true })}
                />
                <label className={styles.controlLabel} htmlFor='ticketcreateform-username'>
                  Имя
                </label>
                <p
                  className={clsx(styles.helpBlock, styles.helpBlockError)}
                  style={{ display: errors.inputName ? 'block' : 'none' }}
                >
                  Введите ваше имя
                </p>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  styles.fieldTicketcreateformUseremail,
                  errors.inputMail && styles.hasError
                )}
              >
                <input
                  type='text'
                  id='ticketcreateform-useremail'
                  className={styles.formControl}
                  {...register('inputMail', {
                    required: 'Почта не может быть пустой',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный формат почты',
                    },
                  })}
                />
                <label className={styles.controlLabel} htmlFor='ticketcreateform-useremail'>
                  Адрес эл. почты
                </label>
                <p
                  className={clsx(styles.helpBlock, styles.helpBlockError)}
                  style={{ display: errors.inputMail ? 'block' : 'none' }}
                >
                  {errors.inputMail?.message}
                </p>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  styles.fieldTicketcreateformPhone,
                  errors.inputPhone && styles.hasError
                )}
              >
                <input
                  type='text'
                  id='ticketcreateform-phone'
                  className={styles.formControl}
                  {...register('inputPhone', {
                    required: 'Телефон не может быть пустым',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Неверный формат телефона',
                    },
                  })}
                />
                <label className={styles.controlLabel} htmlFor='ticketcreateform-phone'>
                  Телефон
                </label>
                <p
                  className={clsx(styles.helpBlock, styles.helpBlockError)}
                  style={{ display: errors.inputPhone ? 'block' : 'none' }}
                >
                  {errors.inputPhone?.message}
                </p>
              </div>
            </div>
            <div
              className={clsx(
                styles.formGroup,
                styles.fieldTicketcreateformText,
                styles.required,
                errors.inputMessage && styles.hasError
              )}
            >
              <textarea
                id='ticketcreateform-text'
                className={styles.formControl}
                rows={5}
                {...register('inputMessage', {
                  required: 'Необходимо заполнить «Текст сообщения».',
                  minLength: {
                    value: 3,
                    message: 'Значение «Текст сообщения» должно содержать минимум 3 символа.',
                  },
                })}
              ></textarea>
              <label className={styles.controlLabel} htmlFor='ticketcreateform-text'>
                Текст сообщения
              </label>
              <p
                className={clsx(styles.helpBlock, styles.helpBlockError)}
                style={{ display: errors.inputMessage ? 'block' : 'none' }}
              >
                {errors.inputMessage?.message}
              </p>
            </div>
            <div className={styles.ajaxFileUploadWidget} data-role='ajax-file-upload-widget'>
              <div className={clsx(styles.formGroup, styles.fieldAjaxfileuploadformUploadedfiles)}>
                <label
                  className={clsx(styles.ajaxFileUploadWidget__label, styles.hasError)}
                  htmlFor='ajaxfileuploadform-uploadedfiles'
                >
                  <div className={styles.ajaxFileUploadWidget__labelIcon}></div>
                  <span className={styles.ajaxFileUploadWidget__labelText}>Прикрепить файлы</span>
                  {!fileValidation && (
                    <p className={clsx(styles.helpBlock, styles.helpBlockError)}>Общий объем файлов превышает 300 МБ</p>
                  )}
                  {!fileCountValidation && (
                    <p className={clsx(styles.helpBlock, styles.helpBlockError)}>Количество файлов превышает 15</p>
                  )}
                </label>
                <input
                  type='file'
                  id='ajaxfileuploadform-uploadedfiles'
                  className={styles.ajaxFileUploadWidget__fileInput}
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              {previews.length > 0 && (
                <div
                  className={clsx(
                    styles.ajaxFileUploadWidget__uploadedFiles,
                    styles.ajaxFileUploadFilesList,
                    styles.filesList
                  )}
                >
                  {renderPreviews()}
                </div>
              )}
              <div
                className={clsx(styles.tooltip, styles.fade, styles.top, styles.in)}
                role='tooltip'
                id='tooltip385270'
                style={{ top: '340.219px', left: '-99.5547px', display: 'block' }}
              >
                <div className={styles.tooltipArrow} style={{ left: '50%' }}></div>
                <div className={styles.tooltipInner}>
                  Вы можете прикрепить изображение или документ формата: doc, docx, xls, xlsx, txt, pdf, jpeg, jpg, png.
                  <br />
                  Общий объем файлов не должен превышать 300 Мб.
                  <br />
                  Количество документов не более 15.
                </div>
              </div>
            </div>
            <div className={styles.dnsRow}>
              <div className={clsx(styles.shopFeedbackBlock__policy, styles.shopFeedbackBlock__text_small)}>
                Нажимая кнопку «Отправить», Вы соглашаетесь c
                <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='/rules/policy/' target='_blank'>
                  Политикой конфиденциальности
                </a>
                и
                <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='/rules/personal-data/' target='_blank'>
                  Политикой компании в отношении обработки персональных данных
                </a>
                , а также - на получение почтовых рассылок рекламного и/или информационного характера.
              </div>
              <div className={styles.shopFeedbackBlock__submitBlock}>
                <button
                  type='submit'
                  className={clsx(styles.nsBtn, styles.btnPrimary, styles.shopFeedbackBlock__submitBtn)}
                >
                  Отправить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
