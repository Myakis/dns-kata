// Импортируем компоненты и модули из библиотек и файлов проекта
import { AppstoreOutlined, HeartOutlined, MobileOutlined } from '@ant-design/icons'; // Импортируем иконки из библиотеки ant-design
import { FC } from 'react'; // Импортируем тип FC (Functional Component) из библиотеки React
import { ICoord } from 'widgets/shops/shops.types'; // Импортируем тип ICoord из файла widgets/shops/shops.types
import styles from './shop-item.module.scss'; // Импортируем стили из файла shop-item.module.scss
import { Link } from 'react-router-dom';

// Определяем интерфейс ShopItemProps для пропсов компонента
interface ShopItemProps {
  id: number;
  name: string; // Название магазина
  address: string; // Адрес магазина
  coords: number[]; // Координаты магазина
  clickHandler: (coord: ICoord) => void; // Функция-обработчик клика, принимающая координаты
}

// Определяем функциональный компонент ShopItem
const ShopItem: FC<ShopItemProps> = ({ id, name, address, coords, clickHandler }) => {
  return (
    <div className={styles['shop-item']}>
      <HeartOutlined className={styles['shop-item__like']} /> {/* Иконка "Избранное" */}
      <div className={styles['shop-item__title-container']}>
        <span
          className={styles['shop-item__title']}
          onClick={() =>
            clickHandler({
              latitude: coords[0], // Передаем широту координаты при клике
              longitude: coords[1], // Передаем долготу координаты при клике
            })
          }
        >
          <Link to={`${id}?latitude=${coords[0]}&longitude=${coords[1]}`}>
            {name} {/* Отображаем название магазина */}
          </Link>
        </span>
        <div className={styles['shop-item__title-icon']}>
          <AppstoreOutlined /> {/* Иконка "Магазин" */}
          <span className={styles['shop-item__title-vobler']}>
            В этом магазине расположен Постамат DNS {/* Текстовое описание */}
            <a href='/'>Подробнее</a> {/* Ссылка для получения дополнительной информации */}
          </span>
        </div>
        <div className={styles['shop-item__title-icon']}>
          <MobileOutlined /> {/* Иконка "Мобильный телефон" */}
          <span className={styles['shop-item__title-vobler']}>
            В магазине могут изготовить пленку для защиты экрана вашего устройства {/* Текстовое описание */}
            <a href='/'>Подробнее</a> {/* Ссылка для получения дополнительной информации */}
          </span>
        </div>
      </div>
      <span className={styles['shop-item__address']}>{address}</span> {/* Отображаем адрес магазина */}
      <span className={styles['shop-item__worktime']}>Пн-Сб с 10:00 до 20:00, Вс с 10:00 до 18:00</span>{' '}
      {/* Время работы магазина */}
    </div>
  );
};

export default ShopItem; // Экспортируем компонент ShopItem
