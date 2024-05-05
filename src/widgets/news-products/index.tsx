import style from './style.module.scss';

const NewsProductsList: React.FC = () => {
  return (
    <div className={style['product']}>
      <div className={style['product__header']}>
        <p className={style['product--title']}>Товары</p>
        <a className={style['product__link']} href='https://www.dns-shop.ru/#' target='__blank'>
          <p>
            Смотреть все<i></i>
          </p>
        </a>
      </div>
      <div className={style['product__list']}></div>
    </div>
  );
};

export default NewsProductsList;
