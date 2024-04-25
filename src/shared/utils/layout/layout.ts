// Примерные пути
export const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return '';
    case '/actions':
      return 'Акции';
    case '/news':
      return 'Новости';
    case '/shops':
      return 'Магазины';
    case '/about/career':
      return 'Карьера';
    case '/help/popular-questions':
      return 'Популярные вопросы';
    case '/feedback':
      return 'Обратная связь';
  }
};
