// Примерные пути
const links = [
  { path: '/', title: 'Главная' },
  { path: '/stocks', title: 'Акции' },
  { path: '/news', title: 'Новости' },
  { path: '/shops', title: 'Магазины' },
  { path: '/about/career', title: 'Карьера' },
  { path: '/help', title: 'Помощь' },
  { path: '/help/popular-questions', title: 'Популярные вопросы' },
  { path: '/feedback', title: 'Обратная связь' },
];

export const getPageTitle = (pathname: string) => {
  const link = links.find((link) => link.path === pathname);
  return link ? link.title : null;
};
