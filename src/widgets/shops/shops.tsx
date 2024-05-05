import { AppstoreOutlined, HeartOutlined, MobileOutlined, SearchOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider } from 'antd';
import { FC, useEffect, useState } from 'react';
import { DnsAPI } from 'shared/api/DNS';
import { useAppSelector } from 'shared/hooks/redux';
import styles from './shops.module.scss';
import { ICoord, ShopItemProps } from './shops.types';

const ShopListItem: FC<ShopItemProps> = ({ name, address, coords, clickHandler }) => {
  return (
    <div className={styles['shop-list-item']}>
      <HeartOutlined className={styles['shop-list-item__like']} />
      <div className={styles['shop-list-item__title-container']}>
        <span
          className={styles['shop-list-item__title']}
          onClick={() =>
            clickHandler({
              latitude: coords[0],
              longitude: coords[1],
            })
          }
        >
          {name}
        </span>
        <div className={styles['shop-list-item__title-icon']}>
          <AppstoreOutlined />
          <span className={styles['shop-list-item__title-vobler']}>
            В этом магазине расположен Постамат DNS
            <a href='/'>Подробнее</a>
          </span>
        </div>
        <div className={styles['shop-list-item__title-icon']}>
          <MobileOutlined />
          <span className={styles['shop-list-item__title-vobler']}>
            В магазине могут изготовить пленку для защиты экрана вашего устройства
            <a href='/'>Подробнее</a>
          </span>
        </div>
      </div>
      <span className={styles['shop-list-item__address']}>{address}</span>
      <span className={styles['shop-list-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>
    </div>
  );
};

const Shops = () => {
  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [isOpenNowFilter, setIsOpenNowFilter] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const currentCity = useAppSelector((state) => state.currentCity);
  const { data: shops, error, isLoading } = DnsAPI.useGetShopsQuery('');

  const [geo, setGeo] = useState<ICoord>({
    latitude: currentCity.coords.latitude,
    longitude: currentCity.coords.longitude,
  });

  // Функция requestGeo запрашивает текущие координаты пользователя для сортировки магазинов по близости.
  const requestGeo = () => {
    const success: PositionCallback = (position) => {
      setGeo({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setSortByDistanceChecked(true);
    };
    const error: PositionErrorCallback = () => {
      setSortByDistanceChecked(false);
    };

    if (!sortByDistanceChecked) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setSortByDistanceChecked(false);
    }
  };

  useEffect(() => {
    setGeo({
      latitude: currentCity.coords.latitude,
      longitude: currentCity.coords.longitude,
    });
  }, [currentCity]);

  const ShopsList = () => {
    if (error) {
      return (
        <span
          style={{
            margin: 'auto',
          }}
        >
          Произошла ошибка. Пожалуйста повторите запрос позже.
        </span>
      );
    }

    return (
      <div className={styles['shops-block__shops-list']}>
        <h2 className={styles['shops-block__sale-channel']}>
          {sortByDistanceChecked ? 'Дистанция: до 1000 метров' : 'DNS'}
        </h2>
        <ul>
          {shops?.map((i) => {
            if (
              i.name.toLowerCase().includes(inputValue.toLowerCase().trim()) &&
              (isOpenNowFilter ? i.inOpen : true) &&
              (sortByDistanceChecked ? i.inNear : true)
            ) {
              return (
                <ShopListItem
                  key={i.id}
                  name={i.name}
                  address={i.streetAddress}
                  coords={i.location}
                  clickHandler={setGeo}
                />
              );
            }
          })}
        </ul>
        <div className={styles['shops-block__not-found']}>
          <img src='https://a.dns-shop.ru/static/05/1l166mw/css/502f45505da2fc318721.png' alt='Not found.' />
          <h3>Странно, но ничего нет</h3>
          <span>Попробуйте изменить критерии поиска</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <div className={styles['shops-block']}>
        <h1 className={styles['shops-block__header']}>Магазины в г. {currentCity.name}</h1>
        <div className={styles['shops-block__main']}>
          <div className={styles['shops-block__filters']}>
            <div className={styles['shops-block__input-search']}>
              <SearchOutlined className={styles['shops-block__input-icon']} />
              <input
                className={styles['shops-block__input']}
                placeholder='Название магазина, адрес, или метро'
                value={inputValue}
                onChange={(e) => {
                  if (inputValue.length <= 200) {
                    setInputValue(e.target.value);
                  } else {
                    setInputValue((state) => state.slice(0, 200));
                  }
                }}
              />
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#fc8507',
                  fontSize: 14,
                },
              }}
            >
              <Checkbox
                className={styles['shops-block__sort']}
                checked={isOpenNowFilter}
                onChange={() => setIsOpenNowFilter((state) => !state)}
              >
                Открыто сейчас
              </Checkbox>
              <Checkbox className={styles['shops-block__sort']} checked={sortByDistanceChecked} onChange={requestGeo}>
                Рядом
              </Checkbox>
            </ConfigProvider>
          </div>
          <div className={styles['shops-block__section']}>
            {!isLoading && <ShopsList />}
            {!isLoading && (
              <iframe
                title='y-map'
                src={`https://yandex.ru/map-widget/v1/?ll=${geo.longitude}%2C${geo.latitude}&z=12`}
                width='468'
                height='650'
                frameBorder='0'
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
