import { FC } from 'react';

import style from './style.module.scss';

const CommentBlock: FC = () => {
  return (
    <div className={style['block']}>
      <h2 className={style['block--title']}>Комментарии</h2>
      <div className={style['block__body']}>
        <textarea className={style['block--input']} placeholder='Написать комментарий...' />
        <button className={style['block--button']}>Отправить</button>
      </div>
    </div>
  );
};

export default CommentBlock;
