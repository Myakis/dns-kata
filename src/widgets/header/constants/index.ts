export interface CatalogItem {
  subcategory: string;
  itemsCount?: number;
  items?: CatalogItem[];
  id: number;
}

export interface Category {
  category: string;
  icon: string;
  items: CatalogItem[];
}

export interface Catalog {
  categories: Category[];
}

interface ILinks {
  label: string;
  address: string;
}

export const navigationLinks: ILinks[] = [
  { label: 'Акции', address: '/stocks' },
  { label: 'Магазины', address: '/shops/moscow' },
  { label: 'Покупателям', address: '/' },
  { label: 'Физическим лицам', address: '/' },
  { label: 'Клуб DNS', address: '/' },
  { label: 'Вакансии', address: '/career' },
];

export const toCustomersLinks: ILinks[] = [
  { label: 'Доставка', address: '/' },
  { label: 'Бонусная программа', address: '/' },
  { label: 'Узнать статус заказа', address: '/' },
  { label: 'Обмен, возврат, гарантия', address: '/' },
  { label: 'Кредиты', address: '/' },
  { label: 'Сервисные центры', address: '/' },
];

export const sideNavigationItems = [
  { label: 'Сравнение', className: 'side-nav__compare' },
  { label: 'Избранное', className: 'side-nav__favorited' },
  { label: 'Корзина', className: 'side-nav__basket' },
  { label: 'Войти', className: 'side-nav__log-in' },
];
