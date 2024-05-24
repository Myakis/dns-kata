export const feedbaackMessage: { title: string; bold: boolean }[] = [
  { title: 'Номер оформленного заказа на покупку товара;', bold: true },
  { title: 'Номер документа на сервисное обслуживание;', bold: true },
  { title: 'Адрес магазина и/или сервисного центра;', bold: false },
  { title: 'Время описываемых событий;', bold: false },
  { title: 'Имена и/или фамилии сотрудников компании;', bold: false },
  { title: 'Наименование товара.', bold: false },
];

export const feedbackThemes: { theme: string; sections: string[] }[] = [
  {
    theme: 'Покупка товара',
    sections: ['В магазине', 'На сайте', 'Нет в наличии', 'Корпоративные продажи', 'Покупатель заблокирован'],
  },
  {
    theme: 'Сервисный центр',
    sections: [
      'Неисправность крупной бытовой техники',
      'Платный ремонт',
      'Гарантийное обслуживание',
      'Качество обслуживания и ремонта',
    ],
  },
  {
    theme: 'Бонусы, подарочные карты, сертификаты',
    sections: ['Подарочные карты', 'Подарочные сертификаты', 'Бонусная программа ProZapass'],
  },
  {
    theme: 'Ошибки и пожелания по сайту/мобильному приложения',
    sections: [
      'Работа сайта/мобильного приложения DNS',
      'Описание товара',
      'Отзывы и комментарии к товару',
      'Драйверы и инструкции',
      'Новости, акции, обзоры',
      'Вопросы по работе конфигуратора ПК',
      'Вопросы по работе конфигуратора кухни',
    ],
  },
  {
    theme: 'Оценка работы',
    sections: ['Магазин', 'Доставка', 'Сервисный центр', 'Интернет-магазин', 'Горячая линия 8-800'],
  },
  {
    theme: 'Коммерческое предложение',
    sections: [
      'По аренде помещений',
      'По услугам',
      'По логистике',
      'По кредитам',
      'По товарам',
      'По рекламе',
      'Предложения для сервисных центров',
    ],
  },
  { theme: 'Трудоустройство в компании', sections: [] },
  { theme: 'Нарушение авторских или смежных прав', sections: [] },
];

export const cityCollection: string[] = [
  'Архангельск',
  'Астрахань',
  'Барнаул',
  'Белгород',
  'Брянск',
  'Великий Новгород',
  'Владивосток',
  'Владимир',
  'Волгоград',
  'Воронеж',
  'Екатеринбург',
  'Иваново',
  'Ижевск',
  'Иркутск',
  'Йошкар-Ола',
  'Казань',
  'Калининград',
  'Кострома',
  'Краснодар',
  'Красноярск',
  'Курск',
  'Липецк',
  'Москва',
  'Мурманск',
  'Набережные Челны',
  'Нижний Новгород',
  'Новосибирск',
  'Омск',
  'Оренбург',
  'Пенза',
  'Пермь',
  'Псков',
  'Пятигорск',
  'Ростов-на-Дону',
  'Рязань',
  'Самара',
  'Санкт-Петербург',
  'Саратов',
  'Смоленск',
  'Сочи',
  'Ставрополь',
  'Тверь',
  'Тольятти',
  'Тула',
  'Ульяновск',
  'Уфа',
  'Хабаровск',
  'Чебоксары',
  'Челябинск',
  'Ярославль',
];
