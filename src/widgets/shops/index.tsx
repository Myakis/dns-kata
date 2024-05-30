// Импортируем компоненты и модули из библиотек и файлов проекта
import { SearchOutlined } from '@ant-design/icons'; // Импортируем иконку поиска
import { Checkbox, ConfigProvider } from 'antd'; // Импортируем компоненты Checkbox и ConfigProvider из библиотеки antd
import ShopItem from 'entities/shop-item'; // Импортируем компонент ShopItem из файла entities/shop-item
import { useEffect, useState } from 'react'; // Импортируем хуки useEffect и useState из библиотеки React
import { useNavigate, useParams } from 'react-router-dom'; // Импортируем хуки useNavigate и useParams из библиотеки react-router-dom
import { DnsAPI } from 'shared/api/DNS'; // Импортируем объект DnsAPI из файла shared/api/DNS
import { OriginalDNSApi } from 'shared/api/original-DNS'; // Импортируем объект OriginalDNSApi из файла shared/api/original-DNS
import styles from './shops.module.scss'; // Импортируем стили из файла shops.module.scss
import { ICoord, ICurrentCity } from './shops.types'; // Импортируем типы ICoord и ICurrentCity из файла shops.types

const Shops = () => {
  const navigate = useNavigate(); // Инициализируем хук navigate для навигации
  const params = useParams(); // Инициализируем хук useParams для получения параметров из URL

  // Устанавливаем начальное состояние currentCity
  const [currentCity, setCurrentCity] = useState<ICurrentCity>({
    name: 'Саратов',
    coords: {
      latitude: 51.5406,
      longitude: 46.0086,
    },
  });

  // Устанавливаем начальное состояние geo
  const [geo, setGeo] = useState<ICoord>({
    latitude: currentCity.coords.latitude,
    longitude: currentCity.coords.longitude,
  });

  // Получаем данные о городах и магазинах с помощью хуков useQuery
  const { data: cities, isLoading: isCitiesLoading, error: citiesError } = OriginalDNSApi.useGetCitiesQuery('');
  const { data: shops, error, isLoading } = DnsAPI.useGetShopsQuery('');

  // Функция loadCity загружает информацию о текущем городе из URL
  const loadCity = () => {
    const pathCity = params.city; // Получаем город из параметров URL
    const city = cities?.data?.cities.find((i) => i.citySlug === pathCity); // Находим город по slug

    if (city) {
      // Если город найден, обновляем состояние currentCity
      setCurrentCity({
        name: city.name,
        coords: {
          latitude: city.latitude,
          longitude: city.longitude,
        },
      });
    }
    if (!city || citiesError) {
      // Если город не найден или произошла ошибка, перенаправляем на город по умолчанию
      navigate('/shops/saratov');
    }
  };

  // Используем useEffect для загрузки города при изменении состояния загрузки городов
  useEffect(() => {
    if (!isCitiesLoading) {
      loadCity();
    }
  }, [isCitiesLoading]);

  // Обновляем состояние geo при изменении currentCity
  useEffect(() => {
    setGeo({
      latitude: currentCity.coords.latitude,
      longitude: currentCity.coords.longitude,
    });
  }, [currentCity]);

  // Дополнительные состояния для фильтров и ввода текста
  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [isOpenNowFilter, setIsOpenNowFilter] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Функция requestGeo запрашивает текущие координаты пользователя для сортировки магазинов по близости
  const requestGeo = () => {
    const success: PositionCallback = (position) => {
      setGeo({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setSortByDistanceChecked(true); // Устанавливаем флажок сортировки по близости
    };
    const error: PositionErrorCallback = () => {
      setSortByDistanceChecked(false); // Сбрасываем флажок сортировки по близости при ошибке
    };

    if (!sortByDistanceChecked) {
      // Если сортировка по близости не включена, запрашиваем текущие координаты
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setSortByDistanceChecked(false); // Иначе сбрасываем флажок сортировки по близости
    }
  };

  // Возвращаем JSX для рендеринга компонентов страницы
  return (
    <div className={styles['container']}>
      <div className={styles['shops']}>
        <h1 className={styles['shops__header']}>Магазины в г. {currentCity.name}</h1>
        <div className={styles['shops__main']}>
          <div className={styles['shops__filters']}>
            <label htmlFor='first' className={styles['shops__input-search']}>
              {''}
              <SearchOutlined className={styles['shops__input-icon']} /> {/* Иконка поиска */}
              <input
                id='first'
                className={styles['shops__input']}
                placeholder='Название магазина, адрес, или метро'
                value={inputValue}
                onChange={(e) => {
                  // Обновляем значение inputValue при вводе
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
                      // Фильтруем и отображаем магазины в зависимости от введенного текста, фильтров и расстояния
                      if (
                        i.name.toLowerCase().includes(inputValue.toLowerCase().trim()) &&
                        (isOpenNowFilter ? i.inOpen : true) &&
                        (sortByDistanceChecked ? i.inNear : true)
                      ) {
                        return (
                          <ShopItem
                            key={i.id}
                            id={i.id}
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
              // Встраиваем карту Yandex с текущими координатами
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

export default Shops; // Экспортируем компонент Shops
