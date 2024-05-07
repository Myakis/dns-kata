import style from './style.module.scss';

const NewsNav: React.FC = () => {
  return (
    <nav className={style['nav']}>
      <button type='button' className={`${style['nav__button']} ${style['nav__button--active']}`}>
        <p>Все</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Новинки</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Общая информация</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Эксклюзивы</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Магазины и сервисные центры</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Услуги</p>
      </button>
      <button type='button' className={`${style['nav__button']}`}>
        <p>Социальная реклама</p>
      </button>
    </nav>
  );
};

export default NewsNav;
