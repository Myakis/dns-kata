import StatComponent from 'entities/news-stat';
import ShareTooltip from 'features/share-tooltip';

import style from './style.module.scss';
import { ReactNode } from 'react';

const q =
  'Arx annus absorbeo.\nVereor stabilis vesica velum allatus.\nVeritas vallum libero comptus casso dolores summisse aqua.\nClementia neque hic peccatus ciminatio aspernatur modi sustineo deludo coadunatio.\nDolor defungo adversus esse laboriosam argumentum patior nam accedo quisquam.\nUllam cubicularis verumtamen casus beatae optio cubicularis advenio officia terminatio.\nTricesimus deorsum nobis cras canto.\nDepopulo acies comprehendo ratione compono succedo.\nCopia degenero cogo.';

function formatText(text: string): ReactNode {
  const arrT = text.split('\n').map((item) => {
    return (
      <div key={self.crypto.randomUUID()}>
        <br />
        <p>{item}</p>
      </div>
    );
  });

  return arrT;
}

const NewsBlock: React.FC = () => {
  return (
    <article className={style['news']}>
      <div className={style['news__container']}>
        <img
          className={style['news--img']}
          src='https://o.dns-shop.ru/original/st1/0833abd91c0e89c93ce5ac82c63fc9af/5df174498aad9cb1feb1449464e692532369159952917100998014af63d6b86f.jpg'
          alt='banner'
        />
        <div className={style['news__post']}>
          <p className={style['news__post--title']}>
            <b>Команда DNS представляет новинку — робот-пылесос Xiaomi Mi Robot Vacuum X20+</b>
          </p>
          <div className={style['news__description']}>{formatText(q)}</div>
          <div className={style['news__stat']}>
            <StatComponent
              fullConfig={true}
              stat={{ date: '2023-09-28T01:58:06.031Z', viewsCount: 1234, commentsCount: 1234 }}
            />
            <ShareTooltip />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsBlock;
