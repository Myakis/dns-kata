import styles from '../footer.module.scss';

export interface Link {
  title: string;
  href: string;
}

export const companyLinks: Link[] = [
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

export const customerLinks: Link[] = [
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

export const appLinks = [
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
