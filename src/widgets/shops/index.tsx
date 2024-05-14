import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider } from 'antd';
import ShopItem from 'entities/shop-item';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DnsAPI } from 'shared/api/DNS';
import { OriginalDNSApi } from 'shared/api/original-DNS';
import styles from './shops.module.scss';
import { ICoord, ICurrentCity } from './shops.types';

const Shops = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [currentCity, setCurrentCity] = useState<ICurrentCity>({
    name: 'Саратов',
    coords: {
      latitude: 51.5406,
      longitude: 46.0086,
    },
  });
  const [geo, setGeo] = useState<ICoord>({
    latitude: currentCity.coords.latitude,
    longitude: currentCity.coords.longitude,
  });

  const { data: cities, isLoading: isCitiesLoading, error: citiesError } = OriginalDNSApi.useGetCitiesQuery('');
  const { data: shops, error, isLoading } = DnsAPI.useGetShopsQuery('');

  const loadCity = () => {
    const pathCity = params.city;
    const city = cities?.data?.cities.find((i) => i.citySlug === pathCity);

    if (city) {
      setCurrentCity({
        name: city.name,
        coords: {
          latitude: city.latitude,
          longitude: city.longitude,
        },
      });
    }
    if (!city || citiesError) {
      navigate('/shops/saratov');
    }
  };

  useEffect(() => {
    if (!isCitiesLoading) {
      loadCity();
    }
  }, [isCitiesLoading]);

  useEffect(() => {
    setGeo({
      latitude: currentCity.coords.latitude,
      longitude: currentCity.coords.longitude,
    });
  }, [currentCity]);

  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [isOpenNowFilter, setIsOpenNowFilter] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <div className={styles['container']}>
      <div className={styles['shops']}>
        <h1 className={styles['shops__header']}>Магазины в г. {currentCity.name}</h1>
        <div className={styles['shops__main']}>
          <div className={styles['shops__filters']}>
            <label htmlFor='first' className={styles['shops__input-search']}>
              {''}
              <SearchOutlined className={styles['shops__input-icon']} />
              <input
                id='first'
                className={styles['shops__input']}
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
            </label>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#fc8507',
                  fontSize: 14,
                },
              }}
            >
              <Checkbox
                className={styles['shops__sort']}
                checked={isOpenNowFilter}
                onChange={() => setIsOpenNowFilter((state) => !state)}
              >
                Открыто сейчас
              </Checkbox>
              <Checkbox className={styles['shops__sort']} checked={sortByDistanceChecked} onChange={requestGeo}>
                Рядом
              </Checkbox>
            </ConfigProvider>
          </div>
          <div className={styles['shops__section']}>
            {!isLoading &&
              (error ? (
                <span
                  style={{
                    margin: 'auto',
                  }}
                >
                  Произошла ошибка. Пожалуйста, повторите запрос позже.
                </span>
              ) : (
                <div className={styles['shops__list']}>
                  <h2 className={styles['shops__sale-channel']}>
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
                          <ShopItem
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
                  <div className={styles['shops__not-found']}>
                    <img src='https://a.dns-shop.ru/static/05/1l166mw/css/502f45505da2fc318721.png' alt='Not found.' />
                    <h3>Странно, но ничего нет</h3>
                    <span>Попробуйте изменить критерии поиска</span>
                  </div>
                </div>
              ))}
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
