import React from 'react';

data.stocks.push({
  id: i,
  productId: i,
  name: faker.lorem.lines({ min: 1, max: 2 }),
  startDate: faker.date.between({ from: '2023-09-24T00:00:00.000Z', to: '2023-09-31T00:00:00.000Z' }),
  endDate: faker.date.between({ from: '2023-09-31T00:00:00.000Z', to: '2023-10-30T00:00:00.000Z' }),
  type: stocksTypes[faker.helpers.rangeToNumber({ min: 0, max: stocksTypes.length - 1 })],
  image: faker.image.urlLoremFlickr({ category: 'nature' }),
  isPopular: Boolean(faker.helpers.maybe(() => 'Hello World!', { probability: 0.6 })),
})

const Main: React.FC = () => {
  return <div>Main</div>;
};

export default Main;
