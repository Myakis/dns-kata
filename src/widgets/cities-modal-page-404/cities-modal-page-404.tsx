import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { DNSOriginalAPI } from 'shared/api/DNS-original';
import { ICity } from 'shared/api/DNS-original/DNS-original.types';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/reducers/CurrentCitySlice';
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
  const [inputValue, setInputValue] = useState('');

  const { data: cities, error, isLoading } = DNSOriginalAPI.useGetCitiesQuery('');

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

  useEffect(() => {
    setTerritory(initialTerritory);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setInputValue('');
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const CitiesList = () => {
    if (!inputValue) {
      return (
        <div className={classes['cities-modal__container']}>
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
      <div className={classes['cities-modal__container']}>
        <ul>
          {cities?.data?.cities.map(
            (i) =>
              i.name.toLowerCase().includes(inputValue.toLowerCase()) && (
                <CitiesListItem key={i.id} name={i.name} cb={() => setCurrentCity(i)} />
              )
          )}
        </ul>
        <span className={classes['cities-modal__not-found']}>Город не найден</span>
      </div>
    );
  };

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
      <CitiesList />
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
      {!isLoading && !error && dialogBox}
      {error && errorDialogBox}
      {isLoading && loadingDialogBox}
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
