import StatComponent from 'entities/news-stat';

import style from './style.module.scss';
import { ReactNode } from 'react';

const q =
  'Робот-пылесос Robot Vacuum X20 оснащен двигателем с мощностью всасывания 6000 Па, что позволяет легко удалять пыль и мусор на различных типах поверхностей. Робот поддерживает влажную, комбинированную и сухую уборку, что делает его универсальным помощником в доме.\nHEPA-фильтр помогает улучшить качество воздуха, задерживая самые мелкие частицы пыли и аллергены. К тому же, устройство может автоматически увеличивать мощность всасывания при движении по ковровым покрытиям, обеспечивая тем самым глубокую очистку.\nДля навигации робот использует систему LiDAR, которая точно сканирует пространство, строит карту помещения в реальном времени и планирует оптимальный маршрут уборки.\nОсобое внимание заслуживает станция, которая не только заряжает устройство, но и автоматически очищает его, заполняет контейнер водой и выполняет полоскание и сушку мопов. Благодаря батарее емкостью 5200 мА*ч робот способен убираться длительное время без перерыва на подзарядку.\nУправление Mi Robot Vacuum X20+ осуществляется через приложение, что делает его использование удобным и интуитивно понятным. Приложение позволяет не только запускать и останавливать уборку, но и настраивать режимы работы, проверять состояние устройства и многое другое.\n';

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

const NewsCard: React.FC = () => {
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
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
