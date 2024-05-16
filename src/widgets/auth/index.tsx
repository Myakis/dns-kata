import { UserOutlined } from '@ant-design/icons';
import AuthModal from 'features/auth-modal';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import Modal from 'shared/modal';
import { authSlice } from 'shared/store/slices/auth-slice';
import styles from './auth.module.scss';
import { avatarImg, links, notificationImg } from './constants';

const Avatar = () => {
  return <img className={styles['auth-dropdown__avatar']} src={avatarImg} alt='user avatar.' />;
};

const Auth: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userEmail = useAppSelector((state) => state.auth.email);

  const dispatch = useAppDispatch();
  const { logOut } = authSlice.actions;

  return (
    <>
      <Modal Dialog={AuthModal} isModalOpen={isModalOpen} closeModalHandler={() => setIsModalOpen(false)} />
      <div className={styles['auth-dropdown']}>
        <div className={styles['auth-dropdown__user']}>
          {userEmail ? <Avatar /> : <UserOutlined className={styles['auth-dropdown__user-icon']} />}
          {!userEmail && <span>Войти</span>}
        </div>
        <div className={styles['auth-dropdown__container']}>
          <div className={styles['auth-dropdown__notifications-container']}>
            <h3>Уведомления</h3>
            <div className={styles['auth-dropdown__notifications']}>
              <img src={notificationImg} alt='Notifications.' />
              <h3>Пока пусто</h3>
              <h2>Здесь будут храниться уведомления о событиях</h2>
            </div>
          </div>
          <div className={styles['auth-dropdown__menu']}>
            {userEmail ? (
              <div className={styles['auth-dropdown__user-container']}>
                <Link to='/'>{userEmail}</Link>
                <Link to='/'>
                  <Avatar />
                </Link>
              </div>
            ) : (
              <>
                <h3>Получайте бонусы, сохраняйте и отслеживайте заказы</h3>
                <button onClick={() => setIsModalOpen(true)} className={styles['auth-dropdown__label']}>
                  Войти
                </button>
              </>
            )}
            <div className={styles['auth-dropdown__link-list']}>
              {links(userEmail).map((i) => (
                <Link to={i.link} key={i.id}>
                  {i.name}
                </Link>
              ))}
              {userEmail && <span onClick={() => dispatch(logOut())}>Выйти</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
