import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/reducers/current-city-slice';
import Page404Shops from 'widgets/shops-page-404/';
import styles from './page-404.module.scss';

const Page404 = () => {
  const [wrapperClasses, setWrapperClasses] = useState(styles['info-block']);
  const { chooseCurrentCity } = currentCitySlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setWrapperClasses(`${styles['info-block']} ${styles['info-block_success']}`);
    }, 350);

    try {
      const city = localStorage.getItem('currentCity');

      city && dispatch(chooseCurrentCity(JSON.parse(city)));
    } catch {
      localStorage.removeItem('currentCity');
    }
  }, []);

  return (
    <>
      <div className={wrapperClasses}>
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
