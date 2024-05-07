/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './style.module.scss';

import StatComponent from 'entities/news-stat';

const test = {
  id: 4,
  name: 'Tui conturbo quidem cupiditas.',
  description:
    'Arx annus absorbeo.\nVereor stabilis vesica velum allatus.\nVeritas vallum libero comptus casso dolores summisse aqua.\nClementia neque hic peccatus ciminatio aspernatur modi sustineo deludo coadunatio.\nDolor defungo adversus esse laboriosam argumentum patior nam accedo quisquam.\nUllam cubicularis verumtamen casus beatae optio cubicularis advenio officia terminatio.\nTricesimus deorsum nobis cras canto.\nDepopulo acies comprehendo ratione compono succedo.\nCopia degenero cogo.',
  type: 'advertising',
  date: '2023-09-27T12:39:48.418Z',
  viewsCount: 2827,
  commentsCount: 6766,
};

const NewsCard: React.FC = () => {
  const shortDiscription = (prevDscr: string): string => {
    const arrd = prevDscr.split('');
    const newDscr = arrd.slice(0, arrd.indexOf(' ', 250));

    return `${newDscr.join('')}...`;
  };

  return (
    <article className={style['news']}>
      <div className={style['news__banner']}>
        <a href='#'>
          <img
            src='https://c.dns-shop.ru/thumb/st1/crop/356/240/2a6fdb2b68178736d29a24319934ce45/cb16acbe34af2fe889243fb5e5276264c629d6bec797712f3ad5c192e668b668.jpg'
            alt='banner'
          />
        </a>
      </div>
      <div className={style['news__title']}>
        <a href='#'>{test.name}</a>
      </div>
      <div className={style['news__discription']}>
        <p>{shortDiscription(test.description)}</p>
      </div>
      <div className={style['news__tags']}>
        <div className={style['news__tag']}>
          <p>{test.type}</p>
        </div>
      </div>
      <div className={style['news__stat']}>
        <StatComponent stat={{ date: test.date, commentsCount: test.commentsCount, viewsCount: test.viewsCount }} />
      </div>
    </article>
  );
};

export default NewsCard;
