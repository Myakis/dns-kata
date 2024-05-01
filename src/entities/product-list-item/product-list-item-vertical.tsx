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
      <div className={`${styles.vobler} ${styles.product__vobler}`}>
        <div className={styles.vobler__name} title='Рассрочка 0-0-12 или Выгода 3 750 ₽'>
          Рассрочка 0-0-12 или Выгода 3 750 ₽
        </div>
      </div>
      <div className={styles.product__stat}>
        <span className={styles.compareCheckbox}>
          <label className={styles.compareCheckbox__label}>
            <span>Сравнить</span>
            <input type='checkbox' className={styles.compareCheckbox__input} />
            <span className={styles.compareCheckbox__box}></span>
          </label>
        </span>
        <a className={styles.product__rating} href='/'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          1.4k
        </a>
      </div>
      <div className={styles.buy}>
        <div className={styles.buy__wrap}>
          <div className={styles.buy__price}>
            33 549&nbsp;₽
            <span className={styles.buy__prev}>37 299</span>
          </div>
          <div className={styles.buy__hint}></div>
          <div className={styles.buy__sub}>или 3 108&nbsp;₽/ мес.</div>
        </div>
        <button type='button' data-tooltip='Добавить в избранное' className={styles.wishlist}></button>
        <button type='button' className={styles.cart}></button>
      </div>
      <span className={styles.avails}>
        <div>
          <span>В наличии </span>
          <a href='/' className={styles.avails__link}>в 29 магазинах</a>
        </div>
        <div>
          <span>Пункты выдачи </span>
          <a href='/' className={styles.avails__link}>доступны</a>
        </div>
        <div>
          <span>Доставим на дом </span>
          <a href='/' className={styles.avails__link}>за 2 часа</a>
        </div>
      </span>
    </section>
  );
};

export default ProductListItemVertical;
