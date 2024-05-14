import { AppstoreOutlined, HeartOutlined, MobileOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { ICoord } from 'widgets/shops/shops.types';
import styles from './shop-item.module.scss';

interface ShopItemProps {
  name: string;
  address: string;
  coords: number[];
  clickHandler: (coord: ICoord) => void;
}

const ShopItem: FC<ShopItemProps> = ({ name, address, coords, clickHandler }) => {
  return (
    <div className={styles['shop-item']}>
      <HeartOutlined className={styles['shop-item__like']} />
      <div className={styles['shop-item__title-container']}>
        <span
          className={styles['shop-item__title']}
          onClick={() =>
            clickHandler({
              latitude: coords[0],
              longitude: coords[1],
            })
          }
        >
          {name}
        </span>
        <div className={styles['shop-item__title-icon']}>
          <AppstoreOutlined />
          <span className={styles['shop-item__title-vobler']}>
            В этом магазине расположен Постамат DNS
            <a href='/'>Подробнее</a>
          </span>
        </div>
        <div className={styles['shop-item__title-icon']}>
          <MobileOutlined />
          <span className={styles['shop-item__title-vobler']}>
            В магазине могут изготовить пленку для защиты экрана вашего устройства
            <a href='/'>Подробнее</a>
          </span>
        </div>
      </div>
      <span className={styles['shop-item__address']}>{address}</span>
      <span className={styles['shop-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>
    </div>
  );
};

export default ShopItem;
