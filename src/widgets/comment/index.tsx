import style from './style.module.scss';

const CommentBlock: React.FC = () => {
  return (
    <div className={style['comment']}>
      <h2 className={style['comment--title']}>Комментарии</h2>
      <div className={style['comment__body']}>
        <textarea className={style['comment--input']} placeholder='Написать комментарий...' />
        <button className={style['comment--button']}>Отправить</button>
      </div>
    </div>
  );
};

export default CommentBlock;
