export const links = (userEmail: string) => {
  return userEmail
    ? [
        { name: 'Заказы', link: '/', id: 1 },
        { name: 'Бонусы ProZaPass', link: '/', id: 2 },
        { name: 'Обратная связь', link: '/', id: 3 },
        { name: 'Сборки компьютеров', link: '/', id: 4 },
        { name: 'Наборы кухонной техники', link: '/', id: 5 },
        { name: 'Обращения в сервис', link: '/', id: 6 },
        { name: 'Контрагенты', link: '/', id: 7 },
        { name: 'Настройки профиля', link: '/', id: 8 },
      ]
    : [
        { name: 'Узнать статус заказа', link: '/', id: 1 },
        { name: 'Обратная связь', link: '', id: 2 },
        { name: 'Обмен, возврат, гарантия', link: '/', id: 3 },
      ];
};

export const notificationImg =
  'data:image/png;base64,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';

export const avatarImg =
  'https://c.dns-shop.ru/thumb/st1/fit/328/328/6a7bc2b700fa30fed310fe6616e9ff35/bb6fa769bbe393c849a725fde858008447abd5d70bc1309ef92fa65760f39295.png';