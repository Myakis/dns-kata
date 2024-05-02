import React, { useState, useEffect } from 'react';
import { companyLinks, customerLinks, appLinks, Link } from './constants';
import styles from './footer.module.scss';
interface Props {}

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

const Footer: React.FC<Props> = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [prevSection, setPrevSection] = useState<string | null>(null);

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
