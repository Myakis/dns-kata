import style from './style.module.scss';

const ShowMoreButton = () => {
  return (
    <div className={style['more__container']}>
      <button className={style['more__button']} type='button'>
        Показать ещё
      </button>
    </div>
  );
};

export default ShowMoreButton;
