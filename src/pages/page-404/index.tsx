import { Link } from 'react-router-dom';
import { default as Page404Shops } from 'widgets/shops-page-404/';
import styles from './page-404.module.scss';

const Page404 = () => {
  return (
    <>
      <div className={styles['info-block']}>
        <div className={`${styles['info-block__bg']} ${styles['info-block__bg_off']}`}></div>
        <div className={`${styles['info-block__bg']} ${styles['info-block__bg_on']}`}></div>
        <div className={styles['info-block__container']}>
          <h1>Страница не найдена</h1>
          <Link to={'/'}>Перейти на главную</Link>
        </div>
      </div>
      <Page404Shops />
      <div className={styles['links-block']}>
        <Link to='/'>
          <img
            src='https://www.dns-shop.ru/files/error-page/assets/images/icon/dns-link-bg.png'
            alt='Ссылка на сайт DNS.'
          />
        </Link>
        <Link to='/'>
          <img
            src='https://www.dns-shop.ru/files/error-page/assets/images/icon/tp-link-bg.png'
            alt='Ссылка на сайт DNS-технопоинт'
          />
        </Link>
        <Link to='/'>
          <img
            src='https://www.dns-shop.ru/files/error-page/assets/images/icon/club-link-bg.png'
            alt='Ссылка на сайт DNS-клуб'
          />
        </Link>
      </div>
    </>
  );
};

export default Page404;
