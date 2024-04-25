import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider, Dropdown, DropdownProps, MenuProps, Radio, Space } from 'antd';
import CitiesModal from 'features/cities-modal';
import { FC, useEffect, useState } from 'react';
import classes from './page-404-shops.module.scss';
import { ICoord, IShop, ShopItemProps } from './page-404-shops.types';

const Page404Shops = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [shops, setShops] = useState<IShop[]>();
  const [inputValue, setInputValue] = useState('');
  const [geo, setGeo] = useState<ICoord>({
    latitude: 46.0086,
    longitude: 51.5406,
  });

  const [isOpenNowFilter, setIsOpenNowFilter] = useState(false);
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

  const setGeoHandler = (coord: ICoord) => {
    setGeo(coord);
  };

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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key) {
      setDropdownOpen(true);
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setDropdownOpen(nextOpen);
    }
  };

  const loadShops = async () => {
    const response = await fetch('http://localhost:8000/shops');

    const data: IShop[] = await response.json();

    setShops(data);
  };

  useEffect(() => {
    loadShops();
  }, []);

  const ShopsList = () => {
    return (
      <div className={classes['shops-block__shops-list']}>
        <h2 className={classes['shops-block__sale-channel']}>
          {sortByDistanceChecked ? 'Дистанция: до 1000 метров' : 'DNS'}
        </h2>
        <ul>
          {shops?.map((i) => {
            if (i.name.toLowerCase().includes(inputValue.toLowerCase())) {
              if (isOpenNowFilter && sortByDistanceChecked) {
                return (
                  i.inOpen &&
                  i.inNear && (
                    <ShopListItem
                      key={i.id}
                      name={i.name}
                      address={i.streetAddress}
                      coords={i.location}
                      clickHandler={setGeoHandler}
                    />
                  )
                );
              }
              if (sortByDistanceChecked) {
                return (
                  i.inNear && (
                    <ShopListItem
                      key={i.id}
                      name={i.name}
                      address={i.streetAddress}
                      coords={i.location}
                      clickHandler={setGeoHandler}
                    />
                  )
                );
              }
              if (isOpenNowFilter) {
                return (
                  i.inOpen && (
                    <ShopListItem
                      key={i.id}
                      name={i.name}
                      address={i.streetAddress}
                      coords={i.location}
                      clickHandler={setGeoHandler}
                    />
                  )
                );
              }
              return (
                <ShopListItem
                  key={i.id}
                  name={i.name}
                  address={i.streetAddress}
                  coords={i.location}
                  clickHandler={setGeoHandler}
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
          <CitiesModal label='Саратов' labelStyle={{ marginLeft: '5px' }} />
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
                  menu={{ items, onClick: handleMenuClick }}
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
            <ShopsList />
            <iframe
              title='y-map'
              src={`https://yandex.ru/map-widget/v1/?ll=${geo.latitude}%2C${geo.longitude}&z=12`}
              width='468'
              height='650'
              frameBorder='0'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default Page404Shops;
