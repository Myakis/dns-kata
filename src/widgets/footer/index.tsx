import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface Link {
  title: string;
  href: string;
}

interface Props {}

const Footer: React.FC<Props> = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [prevSection, setPrevSection] = useState<string | null>(null);

  const companyLinks: Link[] = [
    { title: 'О Компании', href: 'https://www.dns-shop.ru/about' },
    { title: 'Новости', href: 'https://www.dns-shop.ru/news/' },
    { title: 'Партнерам', href: 'https://www.dns-shop.ru/about/partners' },
    { title: 'Вакансии', href: 'https://www.dns-shop.ru/about/career' },
    { title: 'Политика конфеденциальности', href: 'https://www.dns-shop.ru/rules/policy/#policy-one' },
    { title: 'Персональные данные', href: 'https://www.dns-shop.ru/rules/personal-data/#personal-data-intro' },
    { title: 'Правила продаж', href: 'https://www.dns-shop.ru/rules/#rule-one' },
    { title: 'Правила пользования сайта', href: 'https://www.dns-shop.ru/rules/site-usage/#usage-one' },
    {
      title: 'На информационном ресурсе применяются рекомендательные технологии',
      href: 'https://www.dns-shop.ru/rules/recommend-tech/#recommend-tech-one',
    },
    { title: 'Сервисные центры', href: 'https://www.dns-shop.ru/service-center/' },
  ];

  const customerLinks: Link[] = [
    {
      title: 'Как оформить заказ',
      href: 'https://www.dns-shop.ru/help/useful-information/8145d90b-1c3a-44c4-84b9-bb3f54aa783a/',
    },
    {
      title: 'Способы оплаты',
      href: 'https://www.dns-shop.ru/help/useful-information/f112d810-a586-4c60-b651-8d328fe0e0e7/',
    },
    { title: 'Кредиты', href: 'https://www.dns-shop.ru/credit/' },
    { title: 'Доставка', href: 'https://www.dns-shop.ru/help/delivery/' },
    { title: 'Статус заказа', href: 'https://www.dns-shop.ru/profile/order/all/' },
    { title: 'Обмен, возврат, гарантия', href: 'https://www.dns-shop.ru/service-center/exchange-and-returns/' },
    { title: 'Проверка статуса ремонта', href: 'https://www.dns-shop.ru/service-center/status/' },
    { title: 'Юридическим лицам', href: 'https://www.dns-shop.ru/help/legal-entities/' },
    { title: 'Проверка счета', href: 'https://www.dns-shop.ru/help/check/' },
    { title: 'Корпоративные отделы', href: 'https://www.dns-shop.ru/help/legal-entities/#corporate-shops-list' },
    { title: 'Подарочные карты', href: 'https://www.dns-shop.ru/gift-card/' },
    { title: 'Бонусная программа', href: 'https://prozapass.ru/' },
    { title: 'Помощь', href: 'https://www.dns-shop.ru/help/' },
    { title: 'Обратная связь', href: 'https://www.dns-shop.ru/feedback/' },
  ];

  const appLinks = [
    {
      iconClass: styles.appsIcon__iconGooglePlay,
      href: 'https://play.google.com/store/apps/details?id=ru.dns.shop.android',
    },
    { iconClass: styles.appsIcon__iconAppGallery, href: 'https://appgallery.huawei.com/#/app/C108656033' },
    {
      iconClass: styles.appsIcon__iconRuStore,
      href: 'https://apps.rustore.ru/app/ru.dns.shop.android?rsm=1&mt_link_id=ieyfw9',
    },
    { iconClass: styles.appsIcon__iconAppStore, href: 'https://apps.apple.com/ru/app/dns-shop/id6450819523' },
  ];

  const handleSectionClick = (section: string) => {
    setSelectedSection((prevSection) => (prevSection === section ? null : section));
  };

  useEffect(() => {
    const toggleFlipClass = (section: string, addFlip: boolean) => {
      const button = document.querySelector(`.${styles.mobileMenu__title}[data-section='${section}']`);

      if (button) {
        button.classList.toggle(`${styles.flip180}`, addFlip);
      }
    };

    if (prevSection) {
      toggleFlipClass(prevSection, false);
    }

    if (selectedSection) {
      toggleFlipClass(selectedSection, true);
    }

    setPrevSection(selectedSection);
  }, [selectedSection, prevSection]);

  const renderLinks = (links: Link[]) => {
    return links.map((link: Link, index: number) => (
      <li key={index} className={styles.navmenu__linkWrapper}>
        <a href={link.href} className={styles.navmenu__submenuLink}>
          {link.title}
        </a>
      </li>
    ));
  };

  const renderMobileLinks = (links: Link[]) => {
    return links.map((link: Link, index: number) => (
      <li key={index} className={styles.mobileMenu__linkWrapper}>
        <a href={link.href} className={styles.mobileMenu__submenuLink}>
          {link.title}
        </a>
      </li>
    ));
  };

  return (
    <footer className={styles.baseFooter}>
      <div className={styles.baseFooter__container}>
        <div className={styles.baseFooter__sites}>
          <div className={styles.baseFooter__sitesLeft}>
            <div className={styles.siteLogo__wrapper}>
              <a href='/' className={`${styles.siteLogo__link} ${styles.linkDns}`}>
                <div className={styles.baseFooter__iconDnsLogo}></div>
              </a>
            </div>
            <div className={styles.siteLogo__wrapper}>
              <a href='https://club.dns-shop.ru/' className={`${styles.siteLogo__link} ${styles.linkDns}`}>
                <div className={styles.baseFooter__iconDnsClub}></div>
              </a>
            </div>
            <div className={styles.siteLogo__wrapper}>
              <a href='https://www.dns-tech.ru/' className={`${styles.siteLogo__link} ${styles.linkDns}`}>
                <div className={styles.baseFooter__iconDnsTechno}></div>
              </a>
            </div>
          </div>
          <div className={styles.baseFooter__sitesRight}>
            <div className={styles.siteLogo__wrapper}>
              <a href='https://dnsgroup.ru/' className={`${styles.siteLogo__link} ${styles.linkDns}`}>
                <div className={styles.baseFooter__iconDnsGroup}></div>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.baseFooter__main}>
          <div className={styles.baseFooter__links}>
            <div className={styles.baseFooter__menuLinksMobile}>
              <div className={styles.menuLinksMobile}>
                <div className={styles.mobileMenu}>
                  <div className={styles.mobileMenu__wrapper}>
                    <div className={styles.mobileMenu__group} data-group='mobile-menu'>
                      <button
                        className={`${styles.mobileMenu__title} ${selectedSection === 'company' && styles.flip180}`}
                        data-section='company'
                        onClick={() => handleSectionClick('company')}
                      >
                        Компания
                      </button>
                    </div>
                    <div className={styles.mobileMenu__group} data-group='mobile-menu'>
                      <button
                        className={`${styles.mobileMenu__title} ${selectedSection === 'customer' && styles.flip180}`}
                        data-section='customer'
                        onClick={() => handleSectionClick('customer')}
                      >
                        Покупателям
                      </button>
                    </div>
                  </div>
                  {selectedSection && (
                    <ul className={styles.mobileMenu__submenu}>
                      {selectedSection === 'company' && renderMobileLinks(companyLinks)}
                      {selectedSection === 'customer' && renderMobileLinks(customerLinks)}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${styles.menuLinksDesktop} ${styles.baseFooter__mainLeft} ${styles.baseFooter__menuLinksDesktop}`}
            >
              <div className={`${styles.menuLinksDesktop__wrapper} ${styles.navmenu}`}>
                <div className={styles.navmenu__group}>
                  <h6 className={styles.navmenu__title}>Компания</h6>
                  <ul className={styles.navmenu__submenu}>{renderLinks(companyLinks)}</ul>
                </div>
                <div className={styles.navmenu__group}>
                  <h6 className={styles.navmenu__title}>Покупателям</h6>
                  <ul className={styles.navmenu__submenu}>{renderLinks(customerLinks)}</ul>
                </div>
              </div>
              <div className={styles.menuLinksDesktop__apps}>
                <div className={styles.appsIcon}>
                  <div className={styles.appsIcon__appsLinks}>
                    {appLinks.map((appLink, index) => (
                      <a key={index} href={appLink.href}>
                        <div className={appLink.iconClass}></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.menuContacts} ${styles.baseFooter__mainRight} ${styles.baseFooter__contacts}`}>
              <h6 className={styles.menuContacts__title}>Оставайтесь на связи</h6>
              <p className={`${styles.menuContacts__phoneAndWorktime} ${styles.phoneAndWorktime}`}>
                <a href='tel:8-800-77-07-999' className={styles.phoneAndWorktime__number}>
                  8-800-77-07-999&nbsp;
                </a>
                <span className={styles.phoneAndWorktime__worktime}> (с 05:00 до 00:00)</span>
              </p>
              <div className={styles.menuContacts__shopAddress}>
                <a href='https://www.dns-shop.ru/shops/'>Адреса магазинов в г. Город</a>
              </div>
              <div className={`${styles.menuContacts__subscription} ${styles.subscription}`}>
                <p className={styles.subscription__title}>Следите за новинками и акциями:</p>
                <form className={styles.subscription__form}>
                  <div className={styles.subscription__inputContainer}>
                    <input
                      className={styles.subscription__input}
                      type='email'
                      name='email'
                      placeholder='Введите email и подпишитесь'
                      autoComplete='on'
                    />
                    <span className={styles.subscription__submitIcon}>↵</span>
                  </div>
                </form>
                <div className={styles.subscription__policy}>
                  Подписываясь на рассылку, Вы соглашаетесь
                  <div>
                    с условиями
                    <a href='https://www.dns-shop.ru/rules/policy/' className={styles.subscription__policyLink}>
                      {' '}
                      политики конфиденциальности
                    </a>{' '}
                    и
                    <a href='https://www.dns-shop.ru/rules/personal-data/' className={styles.subscription__policyLink}>
                      {' '}
                      политики обработки персональных данных
                    </a>
                  </div>
                </div>
                <div className={styles.subscription__messageContainer} style={{ display: 'none' }}>
                  <p className={styles.subscription__message}></p>
                  <span className={styles.subscription__messageClose}>×</span>
                </div>
              </div>
              <div className={`${styles.menuContacts__social} ${styles.social} ${styles.menuContacts__socialRu}`}>
                <div className={styles.social__links}>
                  <a href='https://vk.com/dnsstore' className={`${styles.social__vkontakte} ${styles.social__link}`}>
                    <div className={styles.menuContacts__iconDnsVk}></div>
                  </a>
                  <a
                    href='https://www.youtube.com/c/DNSTV'
                    className={`${styles.social__youtube} ${styles.social__link}`}
                  >
                    <div className={styles.menuContacts__iconDnsYouTube}></div>
                  </a>
                </div>
                <div className={styles.support__links}>
                  <div className={styles.support__iconDnsSbp}></div>
                  <a href='https://www.dns-shop.ru/akit/' className={styles.socialLink}>
                    <div className={styles.support__iconDnsAkit}></div>
                  </a>
                </div>
              </div>
              <div className={styles.menuContacts__findError}>
                Нашли ошибку на сайте? Выделите текст с ошибкой, нажмите Ctrl+Enter и напишите нам
              </div>
              <div className={styles.menuContacts__apps}>
                <div className={styles.appsIcon}>
                  <div className={styles.appsIcon__appsLinks}>
                    {appLinks.map((appLink, index) => (
                      <a key={index} href={appLink.href}>
                        <div className={appLink.iconClass}></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.baseFooter__copyright}>
          ©&nbsp;2002–2024 Компания DNS. Администрация Сайта не&nbsp;несет ответственности за&nbsp;размещаемые
          Пользователями материалы (в&nbsp;т.ч. информацию и&nbsp;изображения), их&nbsp;содержание и&nbsp;качество.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
