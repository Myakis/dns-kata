import footer from './footer.module.css';

interface Link {
  title: string;
}

const Footer = () => {
  const companyLinks: Link[] = [
    { title: 'О Компании' },
    { title: 'Новости' },
    { title: 'Партнерам' },
    { title: 'Вакансии' },
    { title: 'Политика конфеденциальности' },
    { title: 'Персональные данные' },
    { title: 'Правила продаж' },
    { title: 'Правила пользования сайта' },
    { title: 'На информационном ресурсе применяются рекомендательные технологии' },
    { title: 'Сервисные центры' },
  ];

  const customerLinks: Link[] = [
    { title: 'Как оформить заказ' },
    { title: 'Способы оплаты' },
    { title: 'Кредиты' },
    { title: 'Доставка' },
    { title: 'Статус заказа' },
    { title: 'Обмен, возврат, гарантия' },
    { title: 'Проверка статуса ремонта' },
    { title: 'Юридическим лицам' },
    { title: 'Проверка счета' },
    { title: 'Корпоративные отделы' },
    { title: 'Подарочные карты' },
    { title: 'Бонусная программа' },
    { title: 'Помощь' },
    { title: 'Обратная связь' },
  ];

  const renderLinks = (links: Link[]) => {
    return links.map((link: Link, index: number) => (
      <li key={index} className={footer.navmenu__submenuLink}>
        {link.title}
      </li>
    ));
  };

  return (
    <footer className={footer.baseFooter}>
      <div className={footer.baseFooter__container}>
        <div className={footer.baseFooter__sites}>
          <div className={footer.baseFooter__sitesLeft}>
            <div className={footer.siteLogo__wrapper}>
              <div className={footer.baseFooter__iconDnsLogo}></div>
            </div>
            <div className={footer.siteLogo__wrapper}>
              <div className={footer.baseFooter__iconDnsClub}></div>
            </div>
            <div className={footer.siteLogo__wrapper}>
              <div className={footer.baseFooter__iconDnsTechno}></div>
            </div>
          </div>
          <div className={footer.baseFooter__sitesRight}>
            <div className={footer.siteLogo__wrapper}>
              <div className={footer.baseFooter__iconDnsGroup}></div>
            </div>
          </div>
        </div>
        <div className={footer.baseFooter__main}>
          <div className={footer.baseFooter__links}>
            <div className={footer.baseFooter__menuLinksMobile}>
              <div className={footer.menuLinksMobile}>
                <div className={footer.mobileMenu}>
                  <div className={footer.mobileMenu__wrapper}>
                    <div className={footer.mobileMenu__group} data-group='mobile-menu'>
                      <button className={footer.mobileMenu__title}>Компания</button>
                    </div>
                    <div className={footer.mobileMenu__group} data-group='mobile-menu'>
                      <button className={footer.mobileMenu__title}>Покупателям</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${footer.menuLinksDesktop} ${footer.baseFooter__mainLeft} ${footer.baseFooter__menuLinksDesktop}`}
            >
              <div className={`${footer.menuLinksDesktop__wrapper} ${footer.navmenu}`}>
                <div className={footer.navmenu__group}>
                  <h6 className={footer.navmenu__title}>Компания</h6>
                  <ul className={footer.navmenu__submenu}>{renderLinks(companyLinks)}</ul>
                </div>
                <div className={footer.navmenu__group}>
                  <h6 className={footer.navmenu__title}>Покупателям</h6>
                  <ul className={footer.navmenu__submenu}>{renderLinks(customerLinks)}</ul>
                </div>
              </div>
              <div className={footer.menuLinksDesktop__apps}>
                <div className={footer.appsIcon}>
                  <div className={footer.appsIcon__appsLinks}>
                    <div className={footer.appsIcon__iconGooglePlay}></div>
                    <div className={footer.appsIcon__iconAppGallery}></div>
                    <div className={footer.appsIcon__iconRuStore}></div>
                    <div className={footer.appsIcon__iconAppStore}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${footer.menuContacts} ${footer.baseFooter__mainRight} ${footer.baseFooter__contacts}`}>
              <h6 className={footer.menuContacts__title}>Оставайтесь на связи</h6>
              <p className={`${footer.menuContacts__phoneAndWorktime} ${footer.phoneAndWorktime}`}>
                <div className={footer.phoneAndWorktime__number}>8-800-77-07-999&nbsp;</div>
                <span className={footer.phoneAndWorktime__worktime}> (с 05:00 до 00:00)</span>
              </p>
              <div className={footer.menuContacts__shopAddress}>Адреса магазинов в г. Город</div>
              <div className={`${footer.menuContacts__subscription} ${footer.subscription}`}>
                <p className={footer.subscription__title}>Следите за новинками и акциями:</p>
                <form className={footer.subscription__form}>
                  <div className={footer.subscription__inputContainer}>
                    <input
                      className={footer.subscription__input}
                      type='email'
                      name='email'
                      placeholder='Введите email и подпишитесь'
                      autoComplete='on'
                    />
                    <span className={footer.subscription__submitIcon}>↵</span>
                  </div>
                </form>
                <div className={footer.subscription__policy}>
                  Подписываясь на рассылку, Вы соглашаетесь
                  <div>
                    с условиями
                    <span className={footer.subscription__policyLink}> политики конфиденциальности</span> и
                    <span className={footer.subscription__policyLink}> политики обработки персональных данных</span>
                  </div>
                </div>
                <div className={footer.subscription__messageContainer} style={{ display: 'none' }}>
                  <p className={footer.subscription__message}></p>
                  <span className={footer.subscription__messageClose}>×</span>
                </div>
              </div>
              <div className={`${footer.menuContacts__social} ${footer.social} ${footer.menuContacts__socialRu}`}>
                <div className={footer.social__links}>
                  <div
                    className={`${footer.menuContacts__iconDnsVk} ${footer.social__vkontakte} ${footer.social__link}`}
                  ></div>
                  <div
                    className={`${footer.menuContacts__iconDnsYouTube} ${footer.social__youtube} ${footer.social__link}`}
                  ></div>
                </div>
                <div className={footer.support__links}>
                  <div className={footer.support__iconDnsSbp}></div>
                  <div className={`${footer.support__iconDnsAkit} ${footer.socialLink}`}></div>
                </div>
              </div>
              <div className={footer.menuContacts__findError}>
                Нашли ошибку на сайте? Выделите текст с ошибкой, нажмите Ctrl+Enter и напишите нам
              </div>
            </div>
          </div>
        </div>
        <div className={footer.baseFooter__copyright}>
          ©&nbsp;2002–2024 Компания DNS. Администрация Сайта не&nbsp;несет ответственности за&nbsp;размещаемые
          Пользователями материалы (в&nbsp;т.ч. информацию и&nbsp;изображения), их&nbsp;содержание и&nbsp;качество.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
