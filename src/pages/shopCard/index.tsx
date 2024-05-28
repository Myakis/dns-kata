import { FC, useState, Dispatch, SetStateAction } from 'react';
import styles from './shopCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetShopsQuery } from 'shared/api/DNS';
import Layout from 'pages/layout';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
import FullscreenMode from 'widgets/fullscreenMode';
import DefaultMode from 'widgets/defaultMode';

export interface ShopImage {
  id: number;
  url: string;
}

export interface ShopComponentProps {
  totalSlides: number;
  fullscreenMode: boolean;
  article: IShop;
  toggleFullscreenMode: (id: number) => void;
  shopImages: ShopImage[];
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
}

export interface DefaultProps {
  latitude: string;
  longitude: string;
  totalSlides: number;
  shopImages: ShopImage[];
  article: IShop;
  toggleFullscreenMode: (id: number) => void;
}

const ShopCard: FC = () => {
  //ДЛЯ ВСЕГО
  const { data: shops, isLoading } = useGetShopsQuery('');
  const navigate = useNavigate();

  // Массив с URL-адресами фотографий
  const shopImages: ShopImage[] = [
    { id: 1, url: '/public/img/shopCard/1.jpg' },
    { id: 2, url: '/public/img/shopCard/2.jpg' },
    { id: 3, url: '/public/img/shopCard/3.jpg' },
    { id: 4, url: '/public/img/shopCard/4.jpg' },
    { id: 5, url: '/public/img/shopCard/5.jpg' },
    { id: 6, url: '/public/img/shopCard/6.jpg' },
    { id: 7, url: '/public/img/shopCard/7.jpg' },
    { id: 8, url: '/public/img/shopCard/8.jpg' },
    { id: 9, url: '/public/img/shopCard/9.jpg' },
    { id: 10, url: '/public/img/shopCard/10.jpg' },
    { id: 11, url: '/public/img/shopCard/11.jpg' },
    { id: 12, url: '/public/img/shopCard/12.jpg' },
    { id: 13, url: '/public/img/shopCard/13.jpg' },
    { id: 14, url: '/public/img/shopCard/14.jpg' },
  ];

  const [fullscreenMode, setFullscreenMode] = useState<boolean>(false); // ДЛЯ ВСЕГО
  const totalSlides: number = shopImages.length; // Общее количество слайдов ДЛЯ ВСЕГО
  const [imageIndex, setImageIndex] = useState<number>(0); // состояние для генерации большой картинки ДЛЯ ФУЛСКРИНА

  // Функция для получения query параметров из URL
  // 1. Получает параметры широты и долготы из строки запроса.
  // 2. Получает параметр id из URL.
  // 3. Ищет магазин с соответствующим id в массиве shops.
  // 4. Отображает сообщение о загрузке, если данные еще не загружены.
  // 5. Перенаправляет на страницу ошибки, если магазин с указанным id не найден.
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);

    return {
      latitude: searchParams.get('latitude'),
      longitude: searchParams.get('longitude'),
    };
  };
  const { id } = useParams();
  const { latitude, longitude } = getQueryParams();

  const searchByIdShops = (shops?: IShop[]): IShop | undefined => {
    if (!shops) {
      return;
    }
    return shops.find((item) => item.id === Number(id));
  };

  const article = searchByIdShops(shops);

  if (isLoading) {
    // Если новости загружаются, отображаем сообщение
    return <div className={styles.pageWarning}>Загружаем...</div>;
  }
  if (!article) {
    // Если новость не найдена, перенаправляем на страницу ошибки
    navigate('*');
    return;
  }

  // Функция для переключения между режимами слайдера и полноэкранного режима
  const toggleFullscreenMode = (id: number) => {
    setFullscreenMode(!fullscreenMode);
    setImageIndex(id - 1);
  };

  return (
    <div>
      {fullscreenMode ? (
        // Полноэкранный режим
        <FullscreenMode
          totalSlides={totalSlides}
          fullscreenMode={fullscreenMode}
          article={article}
          toggleFullscreenMode={toggleFullscreenMode}
          shopImages={shopImages}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      ) : (
        // Обычный режим со слайдером
        <Layout pageTitle={article.name || null} breadcrumbs={'Главная'}>
          <article>
            <DefaultMode
              latitude={latitude || ''}
              longitude={longitude || ''}
              totalSlides={totalSlides}
              shopImages={shopImages}
              article={article}
              toggleFullscreenMode={toggleFullscreenMode}
            />
          </article>
        </Layout>
      )}
    </div>
  );
};

export default ShopCard;
