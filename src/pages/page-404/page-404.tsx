import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/reducers/current-city-slice';
import Page404Shops from 'widgets/page-404-shops/page-404-shops';
import classes from './page-404.module.scss';

const Page404 = () => {
  const [wrapperClasses, setWrapperClasses] = useState(classes['info-block']);
  const { chooseCurrentCity } = currentCitySlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setWrapperClasses(`${classes['info-block']} ${classes['info-block_success']}`);
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
        <div className={`${classes['info-block__bg']} ${classes['info-block__bg_off']}`}></div>
        <div className={`${classes['info-block__bg']} ${classes['info-block__bg_on']}`}></div>
        <div className={classes['info-block__container']}>
          <h1>Страница не найдена</h1>
          <Link to={'/'}>Перейти на главную</Link>
        </div>
      </div>
      <Page404Shops />
      <div className={classes['links-block']}>
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