import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { getCities } from 'shared/api/original-DNS';
import { ICities } from 'shared/api/original-DNS/original-dns.types';
import classes from './cities-modal-page-404.module.scss';
import { CitiesListItemProps, CitiesModalProps } from './cities-modal-page-404.types';

const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
  return <button onClick={cb}>{name}</button>;
};

const CitiesModalPage404: FC<CitiesModalProps> = ({ label = 'Modal label', labelStyle, callback = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [cities, setCities] = useState<ICities>();
  const [district, setDistrict] = useState<null | number>(null);
  const [region, setRegion] = useState<null | number>(null);

  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const loadCities = async () => {
    try {
      setDistrict(null);
      setRegion(null);

      setCities(await getCities());
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
                        callback({
                          name: i.name,
                          coords: {
                            latitude: i.latitude,
                            longitude: i.longitude,
                          },
                        });
                        setIsOpen(false);
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
            {cities?.data.cities.map(
              (i) =>
                i.name.toLowerCase().includes(inputValue.toLowerCase()) && (
                  <CitiesListItem
                    key={i.id}
                    name={i.name}
                    cb={() => {
                      callback({
                        name: i.name,
                        coords: {
                          latitude: i.latitude,
                          longitude: i.longitude,
                        },
                      });
                      setIsOpen(false);
                    }}
                  />
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
      {!error && cities && dialogBox}
      {error && errorDialogBox}
      {!cities && !error && loadingDialogBox}
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
