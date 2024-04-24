import { CloseOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider, Dropdown, DropdownProps, MenuProps, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCities, ICities } from 'shared/api:original-DNS';
import classes from './page-404.module.scss';

export interface CitiesListItemProps {
  name: string;
  cb: () => void;
}

const Page404 = () => {
  const [wrapperClasses, setWrapperClasses] = useState(classes['info-block']);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [sortByDistanceChecked, setSortByDistanceChecked] = useState<boolean>(false);
  const [citiesModal, setCitiesModal] = useState<boolean>(false);
  const [cities, setCities] = useState<ICities>();
  const [district, setDistrict] = useState<null | number>(null);
  const [region, setRegion] = useState<null | number>(null);
  const [city, setCity] = useState('Владивосток');
  const [error, setError] = useState(false);
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
              <Radio.Group
                size='large'
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <Space direction='vertical'>
                  <Radio value={1}>Любое время</Radio>
                  <Radio value={2}>Открыто сейчас</Radio>
                </Space>
              </Radio.Group>
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
          console.log(position);
          setSortByDistanceChecked(true);
        });
      } catch {
        setSortByDistanceChecked(false);
      }
    } else {
      setSortByDistanceChecked(false);
    }
  };

  const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
    return <button onClick={cb}>{name}</button>;
  };

  const CitiesModal = () => {
    if (error) {
      return (
        <div
          className={classes['cities-modal']}
          onClick={() => {
            setCitiesModal(false);
          }}
        >
          <div
            className={`${classes['cities-modal__dialog']} ${classes['cities-modal__dialog_error']}`}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseOutlined
              className={classes['cities-modal__close-icon']}
              onClick={() => {
                setCitiesModal(false);
              }}
            />
            <span>Произошла ошибка. Пожалуйста, откройте сайт ДНС и повторите попытку.</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={classes['cities-modal']}
        onClick={() => {
          setCitiesModal(false);
        }}
      >
        <div className={classes['cities-modal__dialog']} onClick={(e) => e.stopPropagation()}>
          <CloseOutlined
            className={classes['cities-modal__close-icon']}
            onClick={() => {
              setCitiesModal(false);
            }}
          />
          <span>Выбор города</span>
          <input placeholder='Поиск' type='text' />
          <div className={classes['cities-modal__container']}>
            <ul>
              {cities?.data.districts.map((i) => (
                <CitiesListItem key={i.id} name={i.name} cb={() => setDistrict(i.id)} />
              ))}
            </ul>

            {district !== null && (
              <ul>
                {cities?.data.regions.map(
                  (i) =>
                    i.districtId === district && <CitiesListItem cb={() => setRegion(i.id)} key={i.id} name={i.name} />
                )}
              </ul>
            )}

            {region !== null && (
              <ul>
                {cities?.data.cities.map(
                  (i) =>
                    i.regionId === region && (
                      <CitiesListItem
                        cb={() => {
                          setCity(i.name);
                          setCitiesModal(false);
                        }}
                        key={i.id}
                        name={i.name}
                      />
                    )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ShopListItem = () => {
    return (
      <div className={classes['shop-list-item']}>
        <div className={classes['shop-list-item__info']}>
          <span className={classes['shop-list-item__title']}>Торговый центр</span>
          <span className={classes['shop-list-item__address']}>г. Северобайкальск, пр-кт Ленинградский, д. 8</span>
        </div>
        <span className={classes['shop-list-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>
      </div>
    );
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

  const citiesHandler = async () => {
    try {
      const data = await getCities();

      setCities(data);

      setDistrict(null);
      setRegion(null);
    } catch {
      setError(true);
    } finally {
      setCitiesModal(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setWrapperClasses(`${classes['info-block']} ${classes['info-block_success']}`);
    }, 350);
  }, []);

  useEffect(() => {
    if (citiesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [citiesModal]);

  return (
    <>
      {citiesModal && <CitiesModal />}
      <div className={wrapperClasses}>
        <div className={`${classes['info-block__bg']} ${classes['info-block__bg_off']}`}></div>
        <div className={`${classes['info-block__bg']} ${classes['info-block__bg_on']}`}></div>
        <div className={classes['info-block__container']}>
          <h1>Страница не найдена</h1>
          <Link to={'/'}>Перейти на главную</Link>
        </div>
      </div>
      <div className={classes['container']}>
        <div className={classes['shops-block']}>
          <h1 className={classes['shops-block__header']}>
            Магазины сети цифровой и бытовой техники DNS в г. <span onClick={citiesHandler}>{city}</span>
          </h1>
          <div className={classes['shops-block__main']}>
            <div className={classes['shops-block__filters']}>
              <div className={classes['shops-block__input-search']}>
                <input className={classes['shops-block__input']} placeholder='Поиск магазина' />
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
              <div className={classes['shops-block__shops-list']}>
                <div className={classes['shops-block__list-group']}>
                  <h2 className={classes['shops-block__sale-channel']}>
                    {sortByDistanceChecked ? 'Дистанция: до 1000 метров' : 'DNS'}
                  </h2>
                  <ShopListItem />
                  <ShopListItem />
                  <ShopListItem />
                </div>
              </div>
              <iframe
                title='y-map'
                src='https://yandex.ru/map-widget/v1/?um=constructor%3A3fab5894fa771dbb5138d80d7c6ae2ce2b7c0c2f7b2953f93737160bcbc27eed&amp;source=constructor'
                width='468'
                height='650'
                frameBorder='0'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
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
