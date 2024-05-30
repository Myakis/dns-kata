import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetShopsQuery } from 'shared/api/DNS';
import Layout from 'pages/layout';
import { shopImages } from './constants';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
import FullscreenMode from 'widgets/fullscreenMode';
import DefaultMode from 'widgets/defaultMode';

const ShopCard: FC = () => {
  //ДЛЯ ВСЕГО
  const { data: shops, isLoading } = useGetShopsQuery('');
  const navigate = useNavigate();
  // Состояние для переключения полноэкранного режима
  const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
  // Общее количество слайдов ДЛЯ ВСЕГО
  const totalSlides: number = shopImages.length;
  // состояние для генерации большой картинки в полноэкранном режиме
  const [imageIndex, setImageIndex] = useState<number>(0);

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
    return <div>Загружаем...</div>;
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
