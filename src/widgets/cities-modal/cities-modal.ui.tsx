import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { getCities } from 'shared/api/original-DNS';
import { ICities } from 'shared/api/original-DNS/original-dns.types';
import classes from './cities-modal.module.scss';

interface CitiesListItemProps {
  name: string;
  cb: () => void;
}
const CitiesListItem = ({ name, cb }: CitiesListItemProps) => {
  return <button onClick={cb}>{name}</button>;
};

interface CitiesModalProps {
  isOpen: boolean;
  handler: (boolean: boolean) => void;
}
const CitiesModal: FC<CitiesModalProps> = ({ isOpen, handler }) => {
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

  if (!cities && !error && isOpen) {
    return (
      <div
        className={classes['cities-modal']}
        onClick={() => {
          handler(false);
        }}
      >
        <div
          className={`${classes['cities-modal__dialog']} ${classes['cities-modal__dialog_error']}`}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseOutlined
            className={classes['cities-modal__close-icon']}
            onClick={() => {
              handler(false);
            }}
          />
          <LoadingOutlined style={{ fontSize: 42, margin: 'auto' }} spin />
        </div>
      </div>
    );
  }

  if (error && isOpen) {
    return (
      <div
        className={classes['cities-modal']}
        onClick={() => {
          handler(false);
        }}
      >
        <div
          className={`${classes['cities-modal__dialog']} ${classes['cities-modal__dialog_error']}`}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseOutlined
            className={classes['cities-modal__close-icon']}
            onClick={() => {
              handler(false);
            }}
          />
          <span>Произошла ошибка. Пожалуйста, откройте сайт ДНС и повторите попытку.</span>
        </div>
      </div>
    );
  }

  if (isOpen) {
    return (
      <div
        className={classes['cities-modal']}
        onClick={() => {
          handler(false);
        }}
      >
        <div className={classes['cities-modal__dialog']} onClick={(e) => e.stopPropagation()}>
          <CloseOutlined
            className={classes['cities-modal__close-icon']}
            onClick={() => {
              handler(false);
            }}
          />
          <span>Выбор города</span>
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
                      i.districtId === district && (
                        <CitiesListItem cb={() => setRegion(i.id)} key={i.id} name={i.name} />
                      )
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
                            handler(false);
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
                      <CitiesListItem key={i.id} name={i.name} cb={() => {}} />
                    )
                )}
              </ul>
              <span className={classes['cities-modal__not-found']}>Город не найден</span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CitiesModal;
