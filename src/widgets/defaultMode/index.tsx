import { FC } from 'react';
import { DefaultProps, Bank } from 'pages/shopCard/shopCard.types';
import { banks } from 'pages/shopCard/constants';
import styles from './defaultMode.module.scss';
import clsx from 'clsx';
import FeedbackForm from './components/feedbackForm';
import SliderDefault from './components/sliderDefault';

// Функция для рендеринга элемента списка
const renderBankItem = (bank: Bank, index: number) => (
  <li key={index} className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
    <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='!#' onClick={(e) => e.preventDefault()}>
      {bank.name}
    </a>
  </li>
);

// Функция для плавной прокрутки к элементу страницы
const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  const element = document.getElementById('shop-feedback');

  if (element) {
    // Проверка на null
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const DefaultMode: FC<DefaultProps> = ({
  latitude,
  longitude,
  totalSlides,
  shopImages,
  article,
  toggleFullscreenMode,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.shopPage}>
        <div className={styles.shopPageContent}>
          <div className={styles.shopPageContent__map}>
            <div className={styles.yaMapContainer}>
              <iframe
                title='y-map'
                // src={`https://yandex.ru/map-widget/v1/?ll=${latitude}%2C${longitude}&z=12&pt=${latitude}%2C${longitude}`}
                src={`https://yandex.ru/map-widget/v1/?ll=${latitude}%2C${longitude}&z=12&pt=${latitude}%2C${longitude}&text=Санкт-Петербург`}
                width='100%'
                height='230px'
                frameBorder='0'
              ></iframe>
            </div>
          </div>
          <SliderDefault
            totalSlides={totalSlides}
            shopImages={shopImages}
            toggleFullscreenMode={toggleFullscreenMode}
          />
          <div className={styles.shopPageContent__section}>
            <div className={styles.shopPageContent__container}>
              <div className={styles.shopPageContent__infoBlock}>
                <div className={styles.shopPageContent__mainInfo}>
                  <div>
                    <div className={clsx(styles.shopPageContent__textLarger, styles.shopPageContent__textBold)}>
                      {article.streetAddress}{' '}
                    </div>
                  </div>
                  <div className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_smallOffset)}>
                    {article.description}{' '}
                  </div>
                  <span className={styles.shopPageContent__text_small}>
                    <div className={styles.shopWorkTime}>
                      <span className={styles.shopWorkTime__textGroup}>Пн-Вт с 10:00 до 22:00</span>
                      <span className={styles.shopWorkTime__dotIcon}></span>
                      <span className={styles.shopWorkTime__textGroup}>Ср-Вс с 10:00 до 23:00</span>
                      <br />
                    </div>
                  </span>
                  <span className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                    <span className={styles.shopPageContent__openStatus}>{article.inOpen ? 'Открыто' : 'Закрыто'}</span>
                  </span>
                  <div className={styles.shopPageContent__voblers}>
                    <div
                      className={styles.shopVobler}
                      data-role='shop-vobler'
                      data-info='В магазине могут изготовить пленку для защиты экрана вашего устройства'
                      data-url='/specialization/hydrogel/'
                    >
                      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M15.2134 0.714844C17.5496 0.714844 19.4434 2.60863 19.4434 4.94484L19.4434 15.2135C19.4434 17.5497 17.5496 19.4435 15.2134 19.4435L8.61869 19.4435C8.41976 19.4435 8.22898 19.3645 8.08832 19.2238L0.861931 11.9964C0.712424 11.8593 0.618692 11.6624 0.618692 11.4435C0.618692 11.4304 0.619028 11.4174 0.619694 11.4044L0.619694 4.94484C0.619694 2.60863 2.51348 0.714843 4.84969 0.714843L15.2134 0.714844ZM3.18018 12.1935L7.86869 16.8827L7.86869 14.4435C7.86869 13.2007 6.86148 12.1935 5.61869 12.1935L3.18018 12.1935ZM9.36869 17.9435L9.36869 14.4435C9.36869 12.3723 7.68991 10.6935 5.61869 10.6935L2.11969 10.6935L2.11969 4.94484C2.11969 3.43706 3.34191 2.21484 4.84969 2.21484L15.2134 2.21484C16.7211 2.21484 17.9434 3.43706 17.9434 4.94484L17.9434 15.2135C17.9434 16.7213 16.7211 17.9435 15.2134 17.9435L9.36869 17.9435Z'></path>
                      </svg>
                    </div>
                    <div
                      className={clsx(styles.shopVoblerPopover, styles.hidden)}
                      style={{ top: '767px', left: '163.5px' }}
                    >
                      <div className={styles.shopVoblerPopover__wrapper}>
                        <div className={styles.shopVoblerPopover__text}>
                          В магазине могут изготовить пленку для защиты экрана вашего устройства
                        </div>
                        <a className={styles.shopVoblerPopover__link} target='_blank' href='/'>
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.shopPageContent__contacts}>
                  <div className={styles.shopPageContent__contactsTitle}>Телефон</div>
                  <div className={styles.shopPageContent__mainPhone}>+7 (499) 704-46-40; +7 (499) 285-00-53</div>
                  <div className={styles.shopPageContent__textToManager}>
                    <a
                      className={clsx(styles.uiLink, styles.uiLink_blue)}
                      href='#shop-feedback'
                      data-role='to-feedback-block'
                      onClick={handleScroll}
                    >
                      Написать управляющему магазина
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.shopPageContent__favoriteShopCheckbox}>
                <div id='id2GlHnr'>
                  <label className={clsx(styles.uiCheckbox, styles.shopPageContent__checkboxContent)}>
                    <span>Добавить в избранные магазины</span>
                    <input
                      type='checkbox'
                      className={styles.uiCheckbox__input}
                      data-role='set-default-shop-chbx'
                      data-save-url='/shops/save-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e&amp;source=2'
                      data-remove-url='/shops/remove-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e'
                    />
                    <span className={styles.uiCheckbox__box}></span>
                  </label>
                </div>
              </div>
            </div>
            {/* <div itemprop='geo' itemscope='' itemtype='http://schema.org/GeoCoordinates'>
            <meta itemprop='longitude' content='37.846731' />
            <meta itemprop='latitude' content='55.658328' />
          </div> */}
          </div>
          <a
            className={clsx(styles.navigationLink, styles.uiLink, styles.uiLink_black)}
            href='!#'
            data-show-navigation-modal=''
            data-latitude='55.658328'
            data-longitude='37.846731'
          >
            Проложить маршрут{' '}
            <span className={styles.navigationLink__icons}>
              <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_yaNav)}></i>
              <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_googleMap)}></i>
              <i className={clsx(styles.navigationLink__icon, styles.navigationLink__icon_2Gis)}></i>
            </span>
          </a>
          <div className={styles.shopPageContent__section}>
            <div className={styles.shopPageContent__addInfoBlocks}>
              <div className={styles.shopPageContent__addInfoItem}>
                <p className={styles.shopPageContent__textBold}>Способы покупки</p>
                <ul>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    В магазине
                  </li>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    Через интернет
                  </li>
                </ul>
              </div>
              <div className={styles.shopPageContent__addInfoItem}>
                <p className={styles.shopPageContent__textBold}>Способы оплаты</p>
                <ul>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    Подарочные карты
                  </li>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    Наличный расчёт
                  </li>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    Безналичный расчёт
                  </li>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    Mastercard
                  </li>
                  <li className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                    VISA
                  </li>
                </ul>
              </div>
              <div className={styles.shopPageContent__addInfoItem}>
                <p className={styles.shopPageContent__textBold}>Способы получения</p>
                <ul>
                  <li className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.shopPageContent__text_small, styles.shopPageContent__text_darkGray)}>
                      Самовывоз{' '}
                    </span>
                  </li>
                  <li className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.uiLink, styles.uiLink_blue)}>Служба доставки</span>
                  </li>
                </ul>
              </div>
              <div className={styles.shopPageContent__addInfoItem}>
                <p className={styles.shopPageContent__textBold}>Кредиты</p>
                <ul>{banks.map(renderBankItem)}</ul>
              </div>
            </div>
          </div>
          <div className={styles.shopPageContent__section}>
            <div
              className={clsx(
                styles.shopCorpInfoBlock__title,
                styles.shopCorpInfoBlock__title_smallOffset,
                styles.shopPageContent__title,
                styles.shopPageContent__title_bold,
                styles.shopPageContent__title_small
              )}
            >
              Корпоративный отдел
            </div>
            <div id='corporate' className={styles.shopCorpInfoBlock} data-role='corp-info-container'>
              <div className={styles.shopCorpInfoBlock__row}>
                <div className={styles.shopWorkTime}>
                  <span className={styles.shopWorkTime__textGroup}>Пн-Вт с 10:00 до 22:00</span>
                  <span className={styles.shopWorkTime__dotIcon}></span>
                  <span className={styles.shopWorkTime__textGroup}>Ср-Вс с 10:00 до 23:00</span>
                  <br />
                </div>
                <span className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                  <span className={styles.shopPageContent__openStatus}>{article.inOpen ? 'Открыто' : 'Закрыто'} </span>
                </span>
              </div>
              <div className={clsx(styles.shopCorpInfoBlock, styles.shopCorpInfoBlock__row)}>
                <div className={clsx(styles.shopCorpInfoBlock__title, styles.shopCorpInfoBlock__title_smallOffset)}>
                  <div className={styles.shopPageContent__textBold}>Руководитель:</div>
                  Баландин Дмитрий Евгеньевич{' '}
                </div>
                <div className={styles.shopPageContent__text_small}>
                  <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                  +7(499)285 00 53{' '}
                </div>
                <div className={styles.shopPageContent__text_small}>
                  <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>E-mail: </span>
                  <a
                    className={clsx(styles.uiLink, styles.uiLink_blue)}
                    href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                  >
                    KotelnikiTRCMegaGiper@dns-shop.ru
                  </a>
                </div>
              </div>
              <div className={clsx(styles.shopCorpInfoBlock__row, styles.shopCorpInfoBlock__row_withoutOffset)}>
                <p
                  className={clsx(
                    styles.shopCorpInfoBlock__title,
                    styles.shopCorpInfoBlock__title_largeOffset,
                    styles.shopPageContent__textBold
                  )}
                >
                  Специалисты по работе с юридическими лицами:
                </p>
                <div className={styles.shopCorpInfoBlock__manager}>
                  <div className={clsx(styles.shopCorpInfoBlock__title, styles.shopCorpInfoBlock__title_smallOffset)}>
                    Пучкова Татьяна Ивановна
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                    +7(499)285 00 53{' '}
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>E-mail: </span>
                    <a
                      className={clsx(styles.uiLink, styles.uiLink_blue)}
                      href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                    >
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
                <div className={styles.shopCorpInfoBlock__manager}>
                  <div className={clsx(styles.shopCorpInfoBlock__title, styles.shopCorpInfoBlock__title_smallOffset)}>
                    Фистунова Дарья Евгеньевна
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                    +7(499)285 00 53{' '}
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>E-mail: </span>
                    <a
                      className={clsx(styles.uiLink, styles.uiLink_blue)}
                      href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                    >
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
                <div className={styles.shopCorpInfoBlock__manager}>
                  <div className={clsx(styles.shopCorpInfoBlock__title, styles.shopCorpInfoBlock__title_smallOffset)}>
                    Никифоров Виталий Всеволодович
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>Тел.: </span>
                    +7(499)285 00 53{' '}
                  </div>
                  <div className={styles.shopPageContent__text_small}>
                    <span className={clsx(styles.title, styles.shopPageContent__text_darkerGray)}>E-mail: </span>
                    <a
                      className={clsx(styles.uiLink, styles.uiLink_blue)}
                      href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'
                    >
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.shopCorpInfoBlock__invoicePayment}>
                <div className={styles.shopPageContent__text_smallOffset}>Проверка оплаты счета</div>
                <form
                  id='f-check-invoice-payment'
                  action='/checkInvoicePayment/check/index/'
                  method='POST'
                  data-method='ajax'
                >
                  <div className={styles.checkInvoiceWidget}>
                    <input
                      type='text'
                      id='invoice'
                      className={styles.checkInvoiceWidget__input}
                      name='number'
                      placeholder='Например: РК1-000201'
                    />
                    <button
                      className={clsx(
                        styles.buttonUi,
                        styles.buttonUi_brand,
                        styles.buttonUi_md,
                        styles.checkInvoiceWidget__button
                      )}
                      type='submit'
                    >
                      Проверить
                    </button>
                    <div id='b-check-invoice-payment-result' className={styles.checkInvoiceWidget__result}></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.shopPageContent__section}>
            <h2
              className={clsx(
                styles.shopPageContent__title,
                styles.shopPageContent__title_bold,
                styles.shopPageContent__title_small
              )}
            >
              Реквизиты
            </h2>
            <div className={styles.shopRequisitesBlock}>
              <div className={styles.shopRequisitesBlock__row}>
                <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                  Название
                </div>
                <div>Филиал Центральный ООО &quot;ДНС Ритейл&quot;</div>
              </div>
              <div className={styles.shopRequisitesBlock__row}>
                <div className={styles.shopRequisitesBlock__infoItem}>
                  <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                    Почтовый адрес
                  </div>
                  <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                </div>
                <div className={styles.shopRequisitesBlock__infoItem}>
                  <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                    Юридический адрес
                  </div>
                  <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                </div>
              </div>
              <div className={styles.shopRequisitesBlock__row}>
                <div className={styles.shopRequisitesBlock__infoItem}>
                  <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                    ИНН / КПП
                  </div>
                  <div>2540167061 / 772043001</div>
                </div>
                <div className={styles.shopRequisitesBlock__infoItem}>
                  <div className={clsx(styles.shopPageContent__text_gray, styles.shopPageContent__text_small)}>
                    ОГРН
                  </div>
                  <div>1102540008230</div>
                </div>
              </div>
            </div>
          </div>
          <FeedbackForm />
          <div className={styles.shopPageContent__section}>
            <a className={clsx(styles.uiLink, styles.uiLink_blue)} href='/shops/moscow/'>
              Все магазины в г.Москва
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultMode;
