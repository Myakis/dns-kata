export interface CatalogItem {
  subcategory: string;
  itemsCount?: number;
  items?: CatalogItem[];
}

export interface Category {
  category: string;
  icon: string;
  items: CatalogItem[];
}

export interface Catalog {
  categories: Category[];
}

export const navigationLinks: string[] = [
  'Акции',
  'Магазины',
  'Покупателям',
  'Физическим лицам',
  'Клуб DNS',
  'Вакансии',
];

export const toCustomersLinks: string[] = [
  'Доставка',
  'Бонусная программа',
  'Узнать статус заказа',
  'Обмен, возврат, гарантия',
  'Кредиты',
  'Сервисные центры',
];

export const sideNavigationItems = [
  { label: 'Сравнение', className: 'side-nav__compare' },
  { label: 'Избранное', className: 'side-nav__favorited' },
  { label: 'Корзина', className: 'side-nav__basket' },
  { label: 'Войти', className: 'side-nav__log-in' },
];
