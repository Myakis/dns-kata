module.exports = () => {
  const { faker } = require('@faker-js/faker');
  const stocksTypes = ['discount', 'benefit', 'kits'];
  const newsTypes = ['new', 'shops', 'commonInfo', 'exclusives', 'services', 'advertising'];
  const data = {
    products: [],
    reviews: [],
    shops: [],
    stocks: [],
    corporateDepartments: [],
    news: [],
    vacancies: [],
  };

  for (let i = 1; i <= 100; i++) {
    const productPrice = faker.commerce.price({ min: 4000, max: 1000000, dec: 0 });
    const inStock = Boolean(faker.helpers.maybe(() => 'Hello World!', { probability: 0.7 }));
    const getRandomStockType = stocksTypes[faker.helpers.rangeToNumber({ min: 0, max: stocksTypes.length - 1 })];
    const getRandomNewsType = newsTypes[faker.helpers.rangeToNumber({ min: 0, max: newsTypes.length - 1 })];

    data.products.push({
      id: i,
      name: faker.commerce.productName(),
      price: productPrice,
      code: faker.helpers.rangeToNumber({ min: 1000, max: 5000 }),
      quantityInStore: faker.helpers.rangeToNumber({ min: 1, max: 20 }),
      color: faker.color.rgb(),
      inStock,
      stockTypes: [...new Set([getRandomStockType, getRandomStockType])],
      discount: faker.commerce.price({ min: 1000, max: 3000, dec: 0 }),
      description: faker.commerce.productDescription(),
      adjective: faker.commerce.productAdjective(),
      priceHistory: [
        {
          dateTime: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-02-01T00:00:00.000Z' }),
          price: faker.commerce.price({ min: 4000, max: Number(productPrice), dec: 0 }),
        },
        {
          dateTime: faker.date.between({ from: '2023-02-01T00:00:00.000Z', to: '2023-03-01T00:00:00.000Z' }),
          price: faker.commerce.price({ min: 4000, max: Number(productPrice), dec: 0 }),
        },
        {
          dateTime: faker.date.between({ from: '2023-03-01T00:00:00.000Z', to: '2023-04-01T00:00:00.000Z' }),
          price: faker.commerce.price({ min: 4000, max: Number(productPrice), dec: 0 }),
        },
      ],
      images: faker.helpers.multiple(
        () => {
          return faker.image.urlLoremFlickr({ category: 'nature' });
        },
        { count: 4 }
      ),
    });

    data.reviews.push({
      id: i,
      productId: i,
      comment: {
        pluses: faker.lorem.lines({ min: 1, max: 10 }),
        minuses: faker.lorem.lines({ min: 1, max: 10 }),
        commentText: faker.lorem.lines({ min: 1, max: 10 }),
      },
      rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    });

    data.shops.push({
      id: i,
      name: `Магазин № ${i}`,
      location: faker.location.nearbyGPSCoordinate({ origin: [59.93428, 30.3351] }),
      streetAddress: faker.location.streetAddress({ useFullAddress: true }),
      inOpen: Boolean(faker.helpers.maybe(() => 'Hello World!', { probability: 0.8 })),
      inNear: Boolean(faker.helpers.maybe(() => 'Hello World!', { probability: 0.4 })),
      description: faker.lorem.lines({ min: 1, max: 1 }),
    });

    data.corporateDepartments.push({
      id: i,
      name: `Корпоративный отдел № ${i}`,
      location: faker.location.nearbyGPSCoordinate({ origin: [55, -37] }),
      streetAddress: faker.location.streetAddress({ useFullAddress: true }),
      description: faker.lorem.lines({ min: 1, max: 1 }),
    });

    data.stocks.push({
      id: i,
      productId: i,
      name: faker.lorem.lines({ min: 1, max: 2 }),
      startDate: faker.date.between({ from: '2023-09-24T00:00:00.000Z', to: '2023-09-31T00:00:00.000Z' }),
      endDate: faker.date.between({ from: '2023-09-31T00:00:00.000Z', to: '2023-10-30T00:00:00.000Z' }),
      type: stocksTypes[faker.helpers.rangeToNumber({ min: 0, max: stocksTypes.length - 1 })],
      image: faker.image.urlLoremFlickr({ category: 'nature' }),
      isPopular: Boolean(faker.helpers.maybe(() => 'Hello World!', { probability: 0.6 })),
    });

    data.news.push({
      id: i,
      name: faker.lorem.lines({ min: 1, max: 3 }),
      description: faker.lorem.lines({ min: 1, max: 10 }),
      type: getRandomNewsType,
      date: faker.date.between({ from: '2023-09-24T00:00:00.000Z', to: '2023-09-31T00:00:00.000Z' }),
      viewsCount: faker.helpers.rangeToNumber({ min: 1, max: 10000 }),
      commentsCount: faker.helpers.rangeToNumber({ min: 1, max: 10000 }),
    });

    data.vacancies.push({
      id: i,
      name: faker.lorem.lines({ min: 1, max: 1 }),
      city: faker.location.city(),
      salaryMin: faker.helpers.rangeToNumber({ min: 16000, max: 25000 }),
      salaryMax: faker.helpers.rangeToNumber({ min: 25000, max: 150000 }),
      requirements: [...Array(3).keys()].map(() => faker.lorem.lines({ min: 1, max: 1 })),
      responsibilities: [...Array(6).keys()].map(() => faker.lorem.lines({ min: 1, max: 1 })),
      weOffer: [...Array(10).keys()].map(() => faker.lorem.lines({ min: 1, max: 1 })),
      contacts: {
        email: faker.internet.email(),
        phone: faker.phone.number('+7 (###) ### ## ##'),
      },
    });
  }

  return data;
};
