import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/slices/current-city-slice';
import { default as Page404Shops } from 'widgets/shops-page-404/';
import styles from './page-404.module.scss';

const Page404 = () => {
  const { chooseCurrentCity } = currentCitySlice.actions;
  const dispatch = useAppDispatch();

  /**
   * useEffect используется для загрузки данных о текущем городе из localStorage.
   * Если данные есть, они передаются в Redux Store.
   * Если при загрузке данных возникает ошибка, localStorage очищается.
   */
  useEffect(() => {
    try {
      const localCity = localStorage.getItem('currentCity');

      localCity && dispatch(chooseCurrentCity(JSON.parse(localCity)));
    } catch {
      localStorage.removeItem('currentCity');
    }
  }, [chooseCurrentCity, dispatch]);

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
