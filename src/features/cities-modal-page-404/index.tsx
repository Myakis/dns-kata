import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { OriginalDNSApi } from 'shared/api/original-DNS';
import { ICity } from 'shared/api/original-DNS/original-DNS.types';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/slices/current-city-slice';
import styles from './cities-modal-page-404.module.scss';
import { CitiesListItemProps, CitiesModalProps, ITerritory } from './cities-modal-page-404.types';

const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
  return <button onClick={cb}>{name}</button>;
};

const CitiesModalPage404: FC<CitiesModalProps> = ({ isModalOpen, closeModalHandler }) => {
  const initialTerritory: ITerritory = {
    region: null,
    district: null,
  };

  const [territory, setTerritory] = useState(initialTerritory);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const { data: cities, error, isLoading } = OriginalDNSApi.useGetCitiesQuery('');
  const { chooseCurrentCity } = currentCitySlice.actions;

  const classes =
    error || isLoading
      ? `${styles['cities-modal__dialog']} ${styles['cities-modal__dialog_error']}`
      : styles['cities-modal__dialog'];

  /**
   * Функция setCurrentCity устанавливает выбранный город в localStorage и передает его в Redux Store.
   */
  const setCurrentCity = (i: ICity) => {
    const currentCity = {
      name: i.name,
      slug: i.citySlug,
      coords: {
        latitude: i.latitude,
        longitude: i.longitude,
      },
    };

    localStorage.setItem('currentCity', JSON.stringify(currentCity));

    dispatch(chooseCurrentCity(currentCity));
    closeModalHandler();
  };

  useEffect(() => {
    setTerritory(initialTerritory);
    isModalOpen && setInputValue('');
  }, [isModalOpen]);

  return (
    <div className={styles['cities-modal']} onMouseDown={(e) => e.stopPropagation()}>
      <div className={classes} onClick={(e) => e.stopPropagation()}>
        <CloseOutlined
          className={styles['cities-modal__close-icon']}
          onClick={() => {
            closeModalHandler();
          }}
        />
        {!error && !isLoading && (
          <>
            <h4>Выбор города</h4>
            <input
              placeholder='Поиск'
              type='text'
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
            {inputValue ? (
              <div className={styles['cities-modal__container']}>
                <ul>
                  {cities?.data?.cities.map(
                    (i) =>
                      i.name.toLowerCase().includes(inputValue.toLowerCase()) && (
                        <CitiesListItem key={i.id} name={i.name} cb={() => setCurrentCity(i)} />
                      )
                  )}
                </ul>
                <span className={styles['cities-modal__not-found']}>Город не найден</span>
              </div>
            ) : (
              <div className={styles['cities-modal__container']}>
                <ul>
                  {cities?.data?.districts.map((i) => (
                    <CitiesListItem
                      key={i.id}
                      name={i.name}
                      cb={() =>
                        setTerritory({
                          region: null,
                          district: i.id,
                        })
                      }
                    />
                  ))}
                </ul>

                {territory.district !== null && (
                  <ul>
                    {cities?.data?.regions.map(
                      (i) =>
                        i.districtId === territory.district && (
                          <CitiesListItem
                            cb={() =>
                              setTerritory((state) => ({
                                ...state,
                                region: i.id,
                              }))
                            }
                            key={i.id}
                            name={i.name}
                          />
                        )
                    )}
                  </ul>
                )}

                {territory.region !== null && (
                  <ul>
                    {cities?.data?.cities.map(
                      (i) =>
                        i.regionId === territory.region && (
                          <CitiesListItem
                            cb={() => {
                              setCurrentCity(i);
                            }}
                            key={i.id}
                            name={i.name}
                          />
                        )
                    )}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
        {error && (
          <span className={styles['cities-modal__error-text']}>
            Произошла ошибка. Пожалуйста, откройте сайт ДНС и повторите попытку.
          </span>
        )}
        {isLoading && <LoadingOutlined className={styles['cities-modal__spinner']} spin />}
      </div>
    </div>
  );
};

export default CitiesModalPage404;
