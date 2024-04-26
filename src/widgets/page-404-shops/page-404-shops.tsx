import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider, Dropdown, DropdownProps, MenuProps, Radio, Space } from 'antd';
import CitiesModal from 'entities/cities-modal-page-404';
import { FC, useEffect, useState } from 'react';
import { getShops } from 'shared/api/DNS';
import classes from './page-404-shops.module.scss';
import { ICoord, ICurrentCity, IShop, ShopItemProps } from './page-404-shops.types';

const ShopListItem: FC<ShopItemProps> = ({ name, address, coords, clickHandler }) => {
  return (
    <div className={classes['shop-list-item']}>
      <div
        className={classes['shop-list-item__info']}
        onClick={() =>
          clickHandler({
            latitude: coords[0],
            longitude: coords[1] * -1,
          })
        }
      >
        <span className={classes['shop-list-item__title']}>{name}</span>
        <span className={classes['shop-list-item__address']}>{address}</span>
      </div>
      <span className={classes['shop-list-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>
    </div>
  );
};

const Page404Shops = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [shops, setShops] = useState<IShop[]>();
  const [inputValue, setInputValue] = useState('');
  const [isOpenNowFilter, setIsOpenNowFilter] = useState(false);
  const [currentCity, setCurrentCity] = useState('Саратов');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [geo, setGeo] = useState<ICoord>({
    latitude: 51.5406,
    longitude: 46.0086,
  });

  const items: MenuProps['items'] = [
    {
      label: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fc8507',
              fontSize: 16,
            },
          }}
        >
          <Checkbox checked={true}>DNS</Checkbox>
        </ConfigProvider>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      key: 1,
      type: 'group',
      label: 'Время работы',
      children: [
        {
          label: (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#fc8507',
                  fontSize: 16,
                },
              }}
            >
              <Space direction='vertical'>
                <Radio value={1} checked={!isOpenNowFilter} onChange={() => setIsOpenNowFilter(false)}>
                  Любое время
                </Radio>
                <Radio value={2} checked={isOpenNowFilter} onChange={() => setIsOpenNowFilter(true)}>
                  Открыто сейчас
                </Radio>
              </Space>
            </ConfigProvider>
          ),
          key: '1-1',
        },
      ],
    },
  ];

  const requestGeo = () => {
    if (!sortByDistanceChecked) {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setSortByDistanceChecked(true);
        });
      } catch {
        setSortByDistanceChecked(false);
      }
    } else {
      setSortByDistanceChecked(false);
    }
  };

  const chooseCurrentCity = (city: ICurrentCity) => {
    setCurrentCity(city.name);
    setGeo(city.coords);
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setDropdownOpen(nextOpen);
    }
  };

  const loadShops = async () => {
    setLoading(true);
    try {
      setShops(await getShops());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

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
      <div className={classes['shops-block__shops-list']}>
        <h2 className={classes['shops-block__sale-channel']}>
          {sortByDistanceChecked ? 'Дистанция: до 1000 метров' : 'DNS'}
        </h2>
        <ul>
          {shops?.map((i) => {
            if (
              i.name.toLowerCase().includes(inputValue.toLowerCase()) &&
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
        <label>По запросу {`"${inputValue}"`} магазинов не найдено </label>
      </div>
    );
  };

  return (
    <div className={classes['container']}>
      <div className={classes['shops-block']}>
        <h1 className={classes['shops-block__header']}>
          Магазины сети цифровой и бытовой техники DNS в г.
          <CitiesModal label={currentCity} labelStyle={{ marginLeft: '5px' }} callback={chooseCurrentCity} />
        </h1>
        <div className={classes['shops-block__main']}>
          <div className={classes['shops-block__filters']}>
            <div className={classes['shops-block__input-search']}>
              <input
                className={classes['shops-block__input']}
                placeholder='Поиск магазина'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <SearchOutlined className={classes['shops-block__input-icon']} />
            </div>
            <div className={classes['shops-block__dropdown']}>
              <span>Показать: </span>
              <ConfigProvider
                theme={{
                  token: {
                    controlItemBgHover: 'false',
                  },
                }}
              >
                <Dropdown
                  menu={{ items, onClick: () => setDropdownOpen(true) }}
                  trigger={['click']}
                  open={dropdownOpen}
                  onOpenChange={handleOpenChange}
                >
                  <button>
                    <Space
                      style={{
                        color: dropdownOpen ? '#fc8507' : '',
                      }}
                    >
                      Все магазины
                      <DownOutlined />
                    </Space>
                  </button>
                </Dropdown>
              </ConfigProvider>
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
                className={classes['shops-block__sort-by-distance']}
                checked={sortByDistanceChecked}
                onChange={requestGeo}
              >
                Сортировать по близости
              </Checkbox>
            </ConfigProvider>
          </div>
          <div className={classes['shops-block__section']}>
            {!loading && <ShopsList />}
            {!loading && (
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

export default Page404Shops;
