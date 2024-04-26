import styles from './product-list-item.module.css';

const ProductListItemVertical = () => {
  return (
    <section className={styles.product}>
      <div className={styles.image}>
        <a href='/' className={styles.image__link}>
          <picture>
            <img
              className={styles.image__picture}
              alt='product'
              src='https://www.electrogor.ru/img/work/nomencl/m_121357.jpg'
            />
          </picture>
        </a>
        <span className={styles.image__discount}>-10%</span>
      </div>
      <a href='/' className={styles.name}>
        <span className={styles.name__span}>
          10.2&quot; Планшет Apple iPad (9th Gen) Wi-Fi 64 ГБ серый [2160x1620, IPS, 6x2.66 ГГц, 3 ГБ, 8686 мА*ч,
          iPadOS 15]
        </span>
      </a>
      <div className={styles.vobler}>
        <div className={styles.vobler__name}>
          Рассрочка 0-0-12 или Выгода 3 750 ₽
        </div>
      </div>
      <div className='product__stat'>
        <span className='compare-checkbox'></span>
        <a className='product__rating' href='/'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          1.4k
        </a>
      </div>
      <div className='product__buy product-buy product-buy_one-line'>
        <div className='product-buy__price-wrap'>
          <div className='product-buy__price'>
            33 549&nbsp;₽
            <span className='product-buy__prev'>37 299</span>
          </div>
          <div className='product-buy__hint'></div>
          <div className='product-buy__sub'>или 3 108 ₽&nbsp; мес.</div>
        </div>
        <button type='button'></button>
        <button type='button'>
          <i></i>
        </button>
      </div>
      <span className='product__avails avails'>
        <div className='avails__shops'>
          <span>В наличии </span>
          <a href='/'>в 29 магазинах</a>
        </div>
        <div className='avails__PVZ'>
          <span>Пункты выдачи </span>
          <a href='/'>доступны</a>
        </div>
        <div className='avails__delivery'>
          <span>Доставим на дом </span>
          <a href='/'>за 2 часа</a>
        </div>
      </span>
    </section>
  );
};

export default ProductListItemVertical;
