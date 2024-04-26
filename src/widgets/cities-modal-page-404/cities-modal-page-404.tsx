import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { getCities as requestCities } from 'shared/api/original-DNS';
import { ICity } from 'shared/api/original-DNS/original-dns.types';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { citiesSlice } from 'shared/store/reducers/CitiesSlice';
import { currentCitySlice } from 'shared/store/reducers/CurrentCity';
import classes from './cities-modal-page-404.module.scss';
import { CitiesListItemProps, CitiesModalProps, ITerritory } from './cities-modal-page-404.types';

const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
  return <button onClick={cb}>{name}</button>;
};

const CitiesModalPage404: FC<CitiesModalProps> = ({ label = 'Modal label', labelStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialTerritory: ITerritory = {
    region: null,
    district: null,
  };

  const [territory, setTerritory] = useState(initialTerritory);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const cities = useAppSelector((state) => state.citiesReducer);
  const { getCities } = citiesSlice.actions;
  const { chooseCurrentCity } = currentCitySlice.actions;
  const dispatch = useAppDispatch();

  const setCurrentCity = (i: ICity) => {
    dispatch(
      chooseCurrentCity({
        name: i.name,
        coords: {
          latitude: i.latitude,
          longitude: i.longitude,
        },
      })
    );
    setIsOpen(false);
  };

  const loadCities = async () => {
    try {
      setTerritory(initialTerritory);
      dispatch(getCities(await requestCities()));
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadCities();
      setInputValue('');
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const dialogBox = (
    <div className={classes['cities-modal__dialog']} onClick={(e) => e.stopPropagation()}>
      <CloseOutlined
        className={classes['cities-modal__close-icon']}
        onClick={() => {
          setIsOpen(false);
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
      {!inputValue && (
        <div className={classes['cities-modal__container']}>
          <ul>
            {cities.data?.districts.map((i) => (
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
              {cities.data?.regions.map(
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
              {cities.data?.cities.map(
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
      {inputValue && (
        <div className={classes['cities-modal__container']}>
          <ul>
            {cities.data?.cities.map(
              (i) =>
                i.name.toLowerCase().includes(inputValue.toLowerCase()) && (
                  <CitiesListItem key={i.id} name={i.name} cb={() => setCurrentCity(i)} />
                )
            )}
          </ul>
          <span className={classes['cities-modal__not-found']}>Город не найден</span>
        </div>
      )}
    </div>
  );

  const errorDialogBox = (
    <div
      className={`${classes['cities-modal__dialog']} ${classes['cities-modal__dialog_error']}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseOutlined
        className={classes['cities-modal__close-icon']}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <span className={classes['cities-modal__error-text']}>
        Произошла ошибка. Пожалуйста, откройте сайт ДНС и повторите попытку.
      </span>
    </div>
  );

  const loadingDialogBox = (
    <div
      className={`${classes['cities-modal__dialog']} ${classes['cities-modal__dialog_error']}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseOutlined
        className={classes['cities-modal__close-icon']}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <LoadingOutlined className={classes['cities-modal__spinner']} spin />
    </div>
  );

  const modal = (
    <div
      className={classes['cities-modal']}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      {!error && !cities.loading && dialogBox}
      {error && errorDialogBox}
      {cities.loading && loadingDialogBox}
    </div>
  );

  return (
    <>
      {isOpen && modal}
      <span style={labelStyle} onClick={() => setIsOpen(true)}>
        {label}
      </span>
    </>
  );
};

export default CitiesModalPage404;
