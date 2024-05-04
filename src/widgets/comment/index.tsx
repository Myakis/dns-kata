import style from './style.module.scss';

const CommentBlock: React.FC = () => {
  return (
    <div className={style['comment']}>
      <h2 className={style['comment--title']}>Комментарии</h2>
      <textarea className={style['comment--input']} />
      <button className={style['comment--button']}>Отправить</button>
    </div>
  );
};

export default CommentBlock;
