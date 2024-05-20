import React from 'react';
import './shopCard.scss'

const ShopCard = () => {
  return (
    <div class='container'>
      <ol class='breadcrumb-list breadcrumb-list-mobile_hidden'>
        <li class='breadcrumb-list__item'>
          <a class='ui-link ui-link_black' href='/shops/moscow/'>
            <span>Москва</span>
          </a>
          <meta itemprop='position' content='1' />
        </li>
        <li class='breadcrumb_last breadcrumb-list__item'>
          <span>DNS Мега Белая Дача</span>
          <meta itemprop='position' content='2' />
        </li>
      </ol>
      <div class='shop-page'>
        <div class='shops-page-city-select'>
          <div class='shops-page-city-select'>Ваш город:</div>
          <div class='shops-page-city-select__wrapper'>
            <div class='city-select-widget__wrapper'>
              <div class='city-select-widget__city-name'>Магнитогорск </div>
            </div>
          </div>
        </div>
        <h1 class='shop-page__title'>Москва - DNS Мега Белая Дача</h1>
        <div class='shop-page-content'>
          <div class='shop-page-content__map '>
            <div class='ya-map-container'></div>
          </div>
          <div class='shop-page-content__photo-slider shop-image-slider'>
            <div class='tns-outer'>
              <div class='tns-controls' aria-label='Carousel Navigation' tabindex='0'>
                <button type='button' data-controls='prev' tabindex='-1' aria-controls='tns1' disabled=''>
                  prev
                </button>
                <button type='button' data-controls='next' tabindex='-1' aria-controls='tns1'>
                  next
                </button>
              </div>
              <div class='tns-liveregion tns-visually-hidden' aria-live='polite' aria-atomic='true'>
                slide <span class='current'>1 to 12</span> of 45
              </div>
              <div id='tns1-mw' class='tns-ovh'>
                <div class='tns-inner' id='tns1-iw'>
                  <div
                    data-role='slider'
                    class='  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal'
                    id='tns1'
                    // style='transition-duration: 0s; transform: translate3d(0px, 0px, 0px);'
                  >
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/1.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/2.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/3.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/4.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/5.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/6.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/7.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/8.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/9.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/10.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/11.jpg' alt='' title='' />
                    </a>
                    <a
                      href='!#'
                      itemprop='image'
                      class='shop-image-slider__item tns-item tns-slide-active'
                      id='tns1-item0'
                    >
                      <img src='../../../public/img/shopCard/12.jpg' alt='' title='' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='shop-page-content__section' itemscope='' itemtype='http://schema.org/Place'>
            <meta itemprop='name' content='Цифровой супермаркет DNS Москва DNS Мега Белая Дача' />
            <div class='shop-page-content__container'>
              <div class='shop-page-content__info-block'>
                <div class='shop-page-content__main-info'>
                  <div itemprop='address' itemscope='' itemtype='http://schema.org/PostalAddress'>
                    <meta itemprop='addressLocality' content='Москва' />
                    <div class='shop-page-content__text_larger shop-page-content__text_bold' itemprop='streetAddress'>
                      г. Москва, 1-й Покровский проезд, дом 1{' '}
                    </div>
                  </div>
                  <div class='shop-page-content__text_small shop-page-content__text_small-offset'>
                    Северное здание (OBI, Decathlon), 1 этаж{' '}
                  </div>
                  <span class='shop-page-content__text_small'>
                    <div class='shop-work-time'>
                      <span class='shop-work-time__text-group'>Пн-Вт с 10:00 до 22:00</span>
                      <span class='shop-work-time__dot-icon'></span>
                      <span class='shop-work-time__text-group'>Ср-Вс с 10:00 до 23:00</span>
                      <br />
                    </div>
                  </span>
                  <span class='shop-page-content__text_gray shop-page-content__text_small'>
                    <span class='shop-page-content__open-status '>закрыто еще 3 ч. </span>
                  </span>
                  <div class='shop-page-content__voblers'>
                    <div
                      class='shop-vobler'
                      data-role='shop-vobler'
                      data-info='В магазине могут изготовить пленку для защиты экрана вашего устройства'
                      data-url='/specialization/hydrogel/'
                    >
                      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M15.2134 0.714844C17.5496 0.714844 19.4434 2.60863 19.4434 4.94484L19.4434 15.2135C19.4434 17.5497 17.5496 19.4435 15.2134 19.4435L8.61869 19.4435C8.41976 19.4435 8.22898 19.3645 8.08832 19.2238L0.861931 11.9964C0.712424 11.8593 0.618692 11.6624 0.618692 11.4435C0.618692 11.4304 0.619028 11.4174 0.619694 11.4044L0.619694 4.94484C0.619694 2.60863 2.51348 0.714843 4.84969 0.714843L15.2134 0.714844ZM3.18018 12.1935L7.86869 16.8827L7.86869 14.4435C7.86869 13.2007 6.86148 12.1935 5.61869 12.1935L3.18018 12.1935ZM9.36869 17.9435L9.36869 14.4435C9.36869 12.3723 7.68991 10.6935 5.61869 10.6935L2.11969 10.6935L2.11969 4.94484C2.11969 3.43706 3.34191 2.21484 4.84969 2.21484L15.2134 2.21484C16.7211 2.21484 17.9434 3.43706 17.9434 4.94484L17.9434 15.2135C17.9434 16.7213 16.7211 17.9435 15.2134 17.9435L9.36869 17.9435Z'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class='shop-page-content__contacts'>
                  <div class='shop-page-content__contacts-title'>Телефон</div>
                  <div class='shop-page-content__main-phone' itemprop='telephone'>
                    +7 (499) 704-46-40; +7 (499) 285-00-53
                  </div>
                  <div class='shop-page-content__text-to-manager'>
                    <a class='ui-link ui-link_blue' href='javascript:' data-role='to-feedback-block'>
                      Написать управляющему магазина
                    </a>
                  </div>
                </div>
              </div>
              <div class='shop-page-content__favorite-shop-checkbox'>
                <div id='id2GlHnr'>
                  <label class='ui-checkbox shop-page-content__checkbox-content'>
                    <span>Добавить в избранные магазины</span>
                    <input
                      type='checkbox'
                      class='ui-checkbox__input'
                      data-role='set-default-shop-chbx'
                      data-save-url='/shops/save-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e&amp;source=2'
                      data-remove-url='/shops/remove-default/?guid=9f9b1b68-3e39-11eb-a219-00155d28220e'
                    />
                    <span class='ui-checkbox__box'></span>
                  </label>
                </div>
              </div>
            </div>
            <div itemprop='geo' itemscope='' itemtype='http://schema.org/GeoCoordinates'>
              <meta itemprop='longitude' content='37.846731' />
              <meta itemprop='latitude' content='55.658328' />
            </div>
          </div>
          <a
            class='navigation-link ui-link ui-link_black'
            href='#'
            data-show-navigation-modal=''
            data-latitude='55.658328'
            data-longitude='37.846731'
          >
            Проложить маршрут{' '}
            <span class='navigation-link__icons'>
              <i class='navigation-link__icon navigation-link__icon_ya-nav'></i>
              <i class='navigation-link__icon navigation-link__icon_google-map'></i>
              <i class='navigation-link__icon navigation-link__icon_2-gis'></i>
            </span>
          </a>
          <div class='shop-page-content__section'>
            <div class='shop-page-content__add-info-blocks'>
              <div class='shop-page-content__add-info-item'>
                <p class='shop-page-content__text_bold'>Способы покупки</p>
                <ul>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>В магазине</li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>Через интернет</li>
                </ul>
              </div>
              <div class='shop-page-content__add-info-item'>
                <p class='shop-page-content__text_bold'>Способы оплаты</p>
                <ul>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>Подарочные карты</li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>Наличный расчёт</li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>Безналичный расчёт</li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>Mastercard</li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>VISA</li>
                </ul>
              </div>
              <div class='shop-page-content__add-info-item'>
                <p class='shop-page-content__text_bold'>Способы получения</p>
                <ul>
                  <li class='shop-page-content__text_small'>
                    <span class='shop-page-content__text_small shop-page-content__text_dark-gray'>Самовывоз </span>
                  </li>
                  <li class='shop-page-content__text_small'>
                    <a class='ui-link ui-link_blue' href='/help/delivery/'>
                      Служба доставки
                    </a>
                  </li>
                </ul>
              </div>
              <div class='shop-page-content__add-info-item'>
                <p class='shop-page-content__text_bold'>Кредиты</p>
                <ul>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#05134bab-436b-11df-bf99-001517c526f1'>
                      АО «Банк Русский Стандарт»
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#05134bb3-436b-11df-bf99-001517c526f1'>
                      ООО "ХКФ Банк"
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#05134bbe-436b-11df-bf99-001517c526f1'>
                      АО "ОТП Банк"
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#05134bbf-436b-11df-bf99-001517c526f1'>
                      Совкомбанк
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#db776ae8-232e-11e2-8df9-00155d030b1f'>
                      АО «Почта Банк»
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#3cf0fbc7-3fe5-11e9-a206-00155d03332b'>
                      ПАО «МТС-Банк»
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#bdf89e95-418f-11ea-a20d-00155df1b805'>
                      МКК «Купи не копи» (ООО)
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#56607e1e-69bd-11e6-a720-00155d033307'>
                      Тинькофф Банк, АО
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#b55c5be3-4475-11e4-b3d3-00155d031202'>
                      КБ "Ренессанс Кредит" (ООО)
                    </a>
                  </li>
                  <li class='shop-page-content__text_small shop-page-content__text_dark-gray'>
                    <a class='ui-link ui-link_blue' href='/credit/#ff6ac355-5c39-11e0-b61b-001517c526f0'>
                      АО «КРЕДИТ ЕВРОПА БАНК (Россия)»
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='shop-page-content__section'>
            <div class='shop-corp-info-block__title shop-corp-info-block__title_small-offset shop-page-content__title shop-page-content__title_bold shop-page-content__title_small'>
              Корпоративный отдел
            </div>
            <div id='corporate' class='shop-corp-info-block' data-role='corp-info-container'>
              <div class='shop-corp-info-block__row'>
                <div class='shop-work-time'>
                  <span class='shop-work-time__text-group'>Пн-Вт с 10:00 до 22:00</span>
                  <span class='shop-work-time__dot-icon'></span>
                  <span class='shop-work-time__text-group'>Ср-Вс с 10:00 до 23:00</span>
                  <br />
                </div>
                <span class='shop-page-content__text_gray shop-page-content__text_small'>
                  <span class='shop-page-content__open-status '>закрыто еще 3 ч. </span>
                </span>
              </div>
              <div class='shop-corp-info-block shop-corp-info-block__row'>
                <div class='shop-corp-info-block__title shop-corp-info-block__title_small-offset'>
                  <div class='shop-page-content__text_bold'>Руководитель:</div>
                  Баландин Дмитрий Евгеньевич{' '}
                </div>
                <div class='shop-page-content__text_small'>
                  <span class='title shop-page-content__text_darker-gray'>Тел.: </span>+7(499)285 00 53{' '}
                </div>
                <div class='shop-page-content__text_small'>
                  <span class='title shop-page-content__text_darker-gray'>E-mail: </span>
                  <a class='ui-link ui-link_blue' href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'>
                    KotelnikiTRCMegaGiper@dns-shop.ru
                  </a>
                </div>
              </div>
              <div class='shop-corp-info-block__row shop-corp-info-block__row_without-offset'>
                <p class='shop-corp-info-block__title shop-corp-info-block__title_large-offset shop-page-content__text_bold'>
                  Специалисты по работе с юридическими лицами:
                </p>
                <div class='shop-corp-info-block__manager'>
                  <div class='shop-corp-info-block__title shop-corp-info-block__title_small-offset'>
                    Пучкова Татьяна Ивановна
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>Тел.: </span>+7(499)285 00 53{' '}
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>E-mail: </span>
                    <a class='ui-link ui-link_blue' href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'>
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
                <div class='shop-corp-info-block__manager'>
                  <div class='shop-corp-info-block__title shop-corp-info-block__title_small-offset'>
                    Фистунова Дарья Евгеньевна
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>Тел.: </span>+7(499)285 00 53{' '}
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>E-mail: </span>
                    <a class='ui-link ui-link_blue' href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'>
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
                <div class='shop-corp-info-block__manager'>
                  <div class='shop-corp-info-block__title shop-corp-info-block__title_small-offset'>
                    Никифоров Виталий Всеволодович
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>Тел.: </span>+7(499)285 00 53{' '}
                  </div>
                  <div class='shop-page-content__text_small'>
                    <span class='title shop-page-content__text_darker-gray'>E-mail: </span>
                    <a class='ui-link ui-link_blue' href='mailto:KotelnikiTRCMegaGiper@dns-shop.ru'>
                      KotelnikiTRCMegaGiper@dns-shop.ru
                    </a>
                  </div>
                </div>
              </div>
              <div class='shop-corp-info-block__invoice-payment'>
                <div class='shop-page-content__text_small-offset'>Проверка оплаты счета</div>
                <form
                  id='f-check-invoice-payment'
                  action='/checkInvoicePayment/check/index/'
                  method='POST'
                  data-method='ajax'
                >
                  <input
                    type='hidden'
                    name='_csrf'
                    value='r0hK4lx2f_BmqmUFGm3F1UYbqR0K98MIpqAL9q8JQozkLD-NGhUoryHgAF1cOby-AC7wUzy49Ebu0l-82nA15g=='
                  />
                  <div class='check-invoice-widget'>
                    <input
                      type='text'
                      id='invoice'
                      class='check-invoice-widget__input'
                      name='number'
                      placeholder='Например: РК1-000201'
                    />
                    <button class='button-ui button-ui_brand button-ui_md check-invoice-widget__button' type='submit'>
                      Проверить
                    </button>
                    <div id='b-check-invoice-payment-result' class='check-invoice-widget__result'></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class='shop-page-content__section'>
            <h2 class='shop-page-content__title shop-page-content__title_bold shop-page-content__title_small'>
              Реквизиты
            </h2>
            <div class='shop-requisites-block'>
              <div class='shop-requisites-block__row'>
                <div class='shop-page-content__text_gray shop-page-content__text_small'>Название</div>
                <div>Филиал Центральный ООО "ДНС Ритейл"</div>
              </div>
              <div class='shop-requisites-block__row'>
                <div class='shop-requisites-block__info-item'>
                  <div class='shop-page-content__text_gray shop-page-content__text_small'>Почтовый адрес</div>
                  <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                </div>
                <div class='shop-requisites-block__info-item'>
                  <div class='shop-page-content__text_gray shop-page-content__text_small'>Юридический адрес</div>
                  <div>111141, город Москва, проезд Перова Поля 1-й, дом 9, строение 2, помещение 3</div>
                </div>
              </div>
              <div class='shop-requisites-block__row'>
                <div class='shop-requisites-block__info-item'>
                  <div class='shop-page-content__text_gray shop-page-content__text_small'>ИНН / КПП</div>
                  <div>2540167061 / 772043001</div>
                </div>
                <div class='shop-requisites-block__info-item'>
                  <div class='shop-page-content__text_gray shop-page-content__text_small'>ОГРН</div>
                  <div>1102540008230</div>
                </div>
              </div>
            </div>
          </div>
          <div class='shop-page-content__section'>
            <h2 class='shop-page-content__title shop-page-content__title_bold shop-page-content__title_small'>
              Обратная связь
            </h2>
            <div class='shop-feedback-block'>
              <a
                class='shop-feedback-block__spoiler-btn'
                href='javascript:'
                data-target='#shop-feedback-info-block'
                data-toggle='collapse'
                aria-expanded='false'
              >
                <span>Справочная информация</span>
                <i></i>
              </a>
              <div id='shop-feedback-info-block' class='shop-feedback-block__info collapse'>
                <p class='shop-feedback-block__text_bold'>Уважаемые клиенты!</p>
                <p class='shop-feedback-block__text_bold'>
                  В целях оперативного рассмотрения ваших обращений просим максимально точно изложить суть вопроса и
                  имеющиеся факты.
                </p>
                <p class='shop-feedback-block__text_small'>
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
                <p class='shop-feedback-block__text_small'>
                  Благодарим вас за сотрудничество и конструктивную обратную связь о работе нашей компании.
                </p>
              </div>
              <div id='shop-feedback-form-wrap' class='shop-feedback-block__form'>
                <form id='ticket-create-form' action='/feedback/' method='post' enctype='multipart/form-data'>
                  <input
                    type='hidden'
                    name='_csrf'
                    value='r0hK4lx2f_BmqmUFGm3F1UYbqR0K98MIpqAL9q8JQozkLD-NGhUoryHgAF1cOby-AC7wUzy49Ebu0l-82nA15g=='
                  />
                  <input type='hidden' id='ticketcreateform-key' name='TicketCreateForm[key]' />
                  <div class='shop-feedback-block__short_fields'>
                    <div class='form-group field-ticketcreateform-username'>
                      <input
                        type='text'
                        id='ticketcreateform-username'
                        class='form-control'
                        name='TicketCreateForm[userName]'
                        value='egorizz'
                        required=''
                      />
                      <label class='control-label' for='ticketcreateform-username'>
                        Имя
                      </label>
                      <p class='help-block help-block-error'></p>
                    </div>
                    <div class='form-group field-ticketcreateform-useremail'>
                      <input
                        type='text'
                        id='ticketcreateform-useremail'
                        class='form-control'
                        name='TicketCreateForm[userEmail]'
                        value='egorizz@mail.ru'
                        required=''
                      />
                      <label class='control-label' for='ticketcreateform-useremail'>
                        Адрес эл. почты
                      </label>
                      <p class='help-block help-block-error'></p>
                    </div>
                    <div class='form-group field-ticketcreateform-phone'>
                      <input
                        type='text'
                        id='ticketcreateform-phone'
                        class='form-control'
                        name='TicketCreateForm[phone]'
                        value='79090935656'
                        required=''
                        data-phone='1'
                      />
                      <label class='control-label' for='ticketcreateform-phone'>
                        Телефон
                      </label>
                      <p class='help-block help-block-error'></p>
                    </div>
                  </div>
                  <div class='form-group field-ticketcreateform-text required'>
                    <textarea
                      id='ticketcreateform-text'
                      class='form-control'
                      name='TicketCreateForm[text]'
                      rows='5'
                      required=''
                      aria-required='true'
                    ></textarea>
                    <label class='control-label' for='ticketcreateform-text'>
                      Текст сообщения
                    </label>
                    <p class='help-block help-block-error'></p>
                  </div>
                  <div class='form-group field-ticketcreateform-city required'>
                    <input
                      type='hidden'
                      id='ticketcreateform-city'
                      class='form-control'
                      name='TicketCreateForm[city]'
                      value='30b7c1f3-03fb-11dc-95ee-00151716f9f5'
                    />
                  </div>
                  <div class='form-group field-ticketcreateform-charter required'>
                    <input
                      type='hidden'
                      id='ticketcreateform-charter'
                      class='form-control'
                      name='TicketCreateForm[charter]'
                      value='0c4a702f-0acd-45c0-adb3-8ebe213e6bd8'
                    />
                  </div>
                  <div class='form-group field-ticketcreateform-theme'>
                    <input
                      type='hidden'
                      id='ticketcreateform-theme'
                      class='form-control'
                      name='TicketCreateForm[theme]'
                      value='5d5f3faf-8455-480a-a7fb-26b41ba5d51c'
                    />
                  </div>
                  <div class='form-group field-ticketcreateform-branch required'>
                    <input
                      type='hidden'
                      id='ticketcreateform-branch'
                      class='form-control'
                      name='TicketCreateForm[branch]'
                      value='9f9b1b68-3e39-11eb-a219-00155d28220e'
                    />
                  </div>
                  <div class='form-group field-ticketcreateform-filesuploadhash'>
                    <input
                      type='hidden'
                      id='ticketcreateform-filesuploadhash'
                      class='form-control'
                      name='TicketCreateForm[filesUploadHash]'
                      value='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                    />
                  </div>
                  <div
                    class='ajax-file-upload-widget'
                    data-role='ajax-file-upload-widget'
                    id='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                    data-widget-hash='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                  >
                    <div class='form-group field-ajaxfileuploadform-uploadedfiles'>
                      <label
                        class='ajax-file-upload-widget__label'
                        data-role='file-input-label'
                        for='ajaxfileuploadform-uploadedfiles'
                      >
                        <div class='ajax-file-upload-widget__label-icon'></div>
                        <span
                          class='ajax-file-upload-widget__label-text'
                          data-toggle='tooltip'
                          data-html='true'
                          data-trigger='hover'
                          data-placement='top'
                          data-container='#cb783719-a30a-4cdf-9e66-ab0cca787b56'
                          title=''
                          data-original-title='Вы можете прикрепить изображение или документ формата: doc, docx, xls, xlsx, txt, pdf, jpeg, jpg, png.<br />
Общий объем файлов не должен превышать 300 Мб.<br />
Количество документов не более 15.'
                        >
                          Прикрепить файлы
                        </span>
                      </label>
                      <input type='hidden' name='AjaxFileUploadForm[uploadedFiles][]' value='' />
                      <input
                        type='file'
                        id='ajaxfileuploadform-uploadedfiles'
                        class='ajax-file-upload-widget__file-input'
                        name='AjaxFileUploadForm[uploadedFiles][]'
                        multiple=''
                        data-role='file-input'
                      />
                    </div>
                    <div
                      class='ajax-file-upload-widget__error ajax-file-upload-widget__error_hidden'
                      data-role='error'
                    ></div>
                    <div
                      id='base-modal-2iQfxNUe'
                      class='ajax-file-input-rules-modal base-modal base-modal_hidden'
                      tabindex='-1'
                      role='dialog'
                      data-role='rules-modal'
                      data-handler-active=''
                      hidden=''
                    >
                      <div class='base-modal__backdrop handler-active' data-base-modal-action='close'></div>
                      <div class='ajax-file-input-rules-modal__container base-modal__container'>
                        <div class='base-modal__header'>
                          <i
                            class='ajax-file-input-rules-modal__header-close-icon base-modal__header-close-icon handler-active'
                            data-base-modal-action='close'
                          ></i>
                        </div>
                        <div class='ajax-file-input-rules-modal__content base-modal__content'>
                          <p>
                            Вы можете прикрепить изображение или документ формата: doc, docx, xls, xlsx, txt, pdf, jpeg,
                            jpg, png.
                            <br />
                            Общий объем файлов не должен превышать 300 Мб.
                            <br />
                            Количество документов не более 15.
                          </p>
                          <div
                            class='ajax-file-input-rules-modal__select-file-button btn btn-additional'
                            data-role='select-file-button'
                          >
                            Выбрать файл
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class='ajax-file-upload-widget__uploaded-files ajax-file-upload-files-list ajax-file-upload-files-list_hidden'
                      data-role='files-list'
                      data-upload-url='/file-upload/'
                      data-files-limit='15'
                    >
                      <div class='ajax-file-upload-files-list__file-sample'>
                        <div class='files-list__file ajax-file-upload-file file' data-role='file-sample'>
                          <div class='file__preview' data-role='preview'>
                            <div class='file__header'>
                              <div class='file__size' data-role='size'></div>
                              <div class='ajax-file-upload-file__remove' data-role='remove-button'></div>
                            </div>
                            <div class='file__icon file-icon file-icon_hidden' data-role='icon'></div>
                            <div class='file__image file__image_hidden' data-role='preview-image'></div>
                            <div
                              class='ajax-file-upload-file__progress-bar progress-bar progress-bar_hidden'
                              data-role='progress-bar'
                            >
                              <div class='progress-bar__bar' data-role='bar'></div>
                            </div>
                          </div>
                          <div
                            class='ajax-file-upload-file__title ajax-file-upload-file__tile_hidden file__title'
                            data-role='title'
                            data-filetype='... .'
                          ></div>
                        </div>
                      </div>
                    </div>
                    <input
                      type='hidden'
                      id='ajaxfileuploadform-widgethash'
                      class='form-control'
                      name='AjaxFileUploadForm[widgetHash]'
                      value='cb783719-a30a-4cdf-9e66-ab0cca787b56'
                      data-role='ajax-file-upload-widget-hash-input'
                    />
                    <input
                      type='hidden'
                      id='ajaxfileuploadform-objecttype'
                      class='form-control'
                      name='AjaxFileUploadForm[objectType]'
                      value='feedback'
                      data-role='ajax-file-upload-widget-object-type-input'
                    />
                  </div>
                  <div class='dns-row'>
                    <div class='shop-feedback-block__policy shop-feedback-block__text_small'>
                      Нажимая кнопку «Отправить», Вы соглашаетесь c
                      <a class='ui-link ui-link_blue' href='/rules/policy/' target='_blank'>
                        Политикой конфиденциальности
                      </a>
                      и
                      <a class='ui-link ui-link_blue' href='/rules/personal-data/' target='_blank'>
                        Политикой компании в отношении обработки персональных данных
                      </a>
                      , а также - на получение почтовых рассылок рекламного и/или информационного характера.{' '}
                    </div>
                    <div class='shop-feedback-block__submit-block'>
                      <button
                        type='submit'
                        class='ns-btn btn-primary shop-feedback-block__submit-btn'
                        data-role='btn-submit'
                        formnovalidate=''
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class='modal fade' id='email-confirm-modal'>
              <div class='modal-dialog'>
                <div class='modal-content'>
                  <div class='modal-header'>
                    <button
                      type='button'
                      class='btn btn-default modal-close-btn'
                      data-dismiss='modal'
                      aria-hidden='true'
                    >
                      <span class='remove' aria-hidden='true'></span>
                    </button>
                  </div>
                  <div class='modal-body'>
                    Пожалуйста, обратите внимание, что Вы не заполнили поле «Адрес эл.почты». В этом случае мы не сможем
                    сообщить результат рассмотрения Вашего обращения.{' '}
                  </div>
                  <div class='modal-footer'>
                    <button type='button' class='btn btn-primary' data-dismiss='modal'>
                      Указать адрес
                    </button>
                    <button type='button' class='btn btn-default' data-dismiss='modal' id='email-modal-submit'>
                      Отправить{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='shop-page-content__section'>
            <a class='ui-link ui-link_blue' href='/shops/moscow/'>
              Все магазины в г.Москва
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
