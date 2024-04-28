import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider, Dropdown, DropdownProps, MenuProps, Radio, Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import { DnsAPI } from 'shared/api/DNS';
import { useAppSelector } from 'shared/hooks/redux';
import CitiesModal from 'widgets/cities-modal-page-404';
import styles from './shops-page-404.module.scss';
import { ICoord, ShopItemProps } from './shops-page-404.types';

const ShopListItem: FC<ShopItemProps> = ({ name, address, coords, clickHandler }) => {
  return (
    <div className={styles['shop-list-item']}>
      <div
        className={styles['shop-list-item__info']}
        onClick={() =>
          clickHandler({
            latitude: coords[0],
            longitude: coords[1] * -1,
          })
        }
      >
        <span className={styles['shop-list-item__title']}>{name}</span>
        <span className={styles['shop-list-item__address']}>{address}</span>
      </div>
      <span className={styles['shop-list-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>
    </div>
  );
};

const ShopsPage404 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
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

  // Элементы меню для Dropdown.
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

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setIsDropdownOpen(nextOpen);
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
        <label>По запросу {`"${inputValue}"`} магазинов не найдено </label>
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <div className={styles['shops-block']}>
        <h1 className={styles['shops-block__header']}>
          Магазины сети цифровой и бытовой техники DNS в г.
          <CitiesModal label={currentCity.name} labelStyle={{ marginLeft: '5px' }} />
        </h1>
        <div className={styles['shops-block__main']}>
          <div className={styles['shops-block__filters']}>
            <div className={styles['shops-block__input-search']}>
              <input
                className={styles['shops-block__input']}
                placeholder='Поиск магазина'
                value={inputValue}
                onChange={(e) => {
                  if (inputValue.length <= 200) {
                    setInputValue(e.target.value);
                  } else {
                    setInputValue((state) => state.slice(0, 200));
                  }
                }}
              />
              <SearchOutlined className={styles['shops-block__input-icon']} />
            </div>
            <div className={styles['shops-block__dropdown']}>
              <span>Показать: </span>
              <ConfigProvider
                theme={{
                  token: {
                    controlItemBgHover: 'false',
                  },
                }}
              >
                <Dropdown menu={{ items }} trigger={['click']} open={isDropdownOpen} onOpenChange={handleOpenChange}>
                  <button>
                    <Space
                      style={{
                        color: isDropdownOpen ? '#fc8507' : '',
                      }}
                    >
                      Все магазины
                      {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
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
                className={styles['shops-block__sort-by-distance']}
                checked={sortByDistanceChecked}
                onChange={requestGeo}
              >
                Сортировать по близости
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

export default ShopsPage404;
