import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './page-404.module.scss';

const Page404 = () => {
  const [wrapperClasses, setWrapperClasses] = useState(classes['info-block']);

  useEffect(() => {
    setTimeout(() => {
      setWrapperClasses(`${classes['info-block']} ${classes['info-block_success']}`);
    }, 350);
  }, []);

  return (
    <div className={wrapperClasses}>
      <div className={`${classes['info-block__bg']} ${classes['info-block__bg_off']}`}></div>
      <div className={`${classes['info-block__bg']} ${classes['info-block__bg_on']}`}></div>
      <div className={classes['info-block__container']}>
        <h1>Страница не найдена</h1>
        <Link to={'/'}>Перейти на главную</Link>
      </div>
    </div>
  );
};

export default Page404;
