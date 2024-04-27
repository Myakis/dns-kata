import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { DNSOriginalAPI } from 'shared/api/DNS-original';
import { ICity } from 'shared/api/DNS-original/DNS-original.types';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/reducers/current-city-slice';
import styles from './cities-modal-page-404.module.scss';
import { CitiesListItemProps, CitiesModalProps, ITerritory } from './cities-modal-page-404.types';

const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
  return <button onClick={cb}>{name}</button>;
};

const CitiesModalPage404: FC<CitiesModalProps> = ({ label = 'Modal label', labelStyle }) => {
  const initialTerritory: ITerritory = {
    region: null,
    district: null,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [territory, setTerritory] = useState(initialTerritory);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const { data: cities, error, isLoading } = DNSOriginalAPI.useGetCitiesQuery('');
  const { chooseCurrentCity } = currentCitySlice.actions;

  const setCurrentCity = (i: ICity) => {
    const currentCity = {
      name: i.name,
      coords: {
        latitude: i.latitude,
        longitude: i.longitude,
      },
    };

    localStorage.setItem('currentCity', JSON.stringify(currentCity));

    dispatch(chooseCurrentCity(currentCity));
    setIsModalOpen(false);
  };

  useEffect(() => {
    setTerritory(initialTerritory);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setInputValue('');
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const CitiesList = () => {
    if (!inputValue) {
      return (
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
      );
    }
    return (
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
    );
  };

  const dialogBox = (
    <div className={styles['cities-modal__dialog']} onClick={(e) => e.stopPropagation()}>
      <CloseOutlined
        className={styles['cities-modal__close-icon']}
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
      <h4>Выбор города</h4>
      <input
        placeholder='Поиск'
        type='text'
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
      />
      <CitiesList />
    </div>
  );

  const errorDialogBox = (
    <div
      className={`${styles['cities-modal__dialog']} ${styles['cities-modal__dialog_error']}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseOutlined
        className={styles['cities-modal__close-icon']}
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
      <span className={styles['cities-modal__error-text']}>
        Произошла ошибка. Пожалуйста, откройте сайт ДНС и повторите попытку.
      </span>
    </div>
  );

  const loadingDialogBox = (
    <div
      className={`${styles['cities-modal__dialog']} ${styles['cities-modal__dialog_error']}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseOutlined
        className={styles['cities-modal__close-icon']}
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
      <LoadingOutlined className={styles['cities-modal__spinner']} spin />
    </div>
  );

  const modal = (
    <div
      className={styles['cities-modal']}
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      {!isLoading && !error && dialogBox}
      {error && errorDialogBox}
      {isLoading && loadingDialogBox}
    </div>
  );

  return (
    <>
      {isModalOpen && modal}
      <span style={labelStyle} onClick={() => setIsModalOpen(true)}>
        {label}
      </span>
    </>
  );
};

export default CitiesModalPage404;
