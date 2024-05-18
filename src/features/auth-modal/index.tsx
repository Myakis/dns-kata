import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/redux';
import { authSlice } from 'shared/store/slices/auth-slice';
import styles from './auth-modal.module.scss';
import { AuthModalProps, Inputs } from './auth-modal.types';

const AuthModal: FC<AuthModalProps> = ({ closeModalHandler }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { auth } = authSlice.actions;
  const [isReg, setIsReg] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);

  const regEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { password, email } = data;
    const userData = {
      password: password.trim(),
      email: email.trim(),
    };

    switch (isReg) {
      case true:
        if (localStorage.getItem(userData.email)) {
          setIsOccupied(true);
        } else {
          localStorage.setItem(userData.email, userData.password);
          dispatch(auth(userData));
          closeModalHandler();
        }

        break;
      case false:
        if (localStorage.getItem(userData.email) === userData.password) {
          dispatch(auth(userData));
          closeModalHandler();
        } else {
          setAuthErr(true);
        }
        break;
    }
  };

  useEffect(() => {
    reset();
  }, [isReg]);

  return (
    <div className={styles['auth']} onMouseDown={(e) => e.stopPropagation()}>
      <div
        className={styles['auth__container']}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <CloseOutlined
          className={styles['auth__close-icon']}
          onClick={() => {
            closeModalHandler();
          }}
        />
        {isReg ? (
          <h3>Регистрация</h3>
        ) : (
          <h3>
            Войти <br />
            или <span onClick={() => setIsReg(true)}>зарегистрироваться</span>
          </h3>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={styles['auth__input-container']}
            style={{
              border: errors.email?.message && '1px solid red',
            }}
          >
            <input
              id='email'
              placeholder=''
              value={watch('email', '')}
              {...register('email', {
                required: 'e-mail обязателен к заполнению.',
                pattern: {
                  value: regEmail,
                  message: 'Пожалуйста, введите валидный e-mail.',
                },
              })}
            />
            <label htmlFor='email'>e-mail</label>
            <QuestionCircleOutlined className={styles['auth__input-icon']} />
            <span className={styles['auth__input-modal']}>Формат e-mail: name@example.ru</span>
          </label>
          <label
            className={styles['auth__input-container']}
            style={{
              border: errors.password?.message && '1px solid red',
            }}
          >
            <input
              type={showPassword ? 'text ' : 'password'}
              id='password'
              placeholder=''
              value={watch('password', '').trim()}
              {...register('password', {
                required: 'Пароль обязателен к заполнению.',
                maxLength: {
                  value: 40,
                  message: 'Ваш пароль должен быть короче 40 символов.',
                },
                minLength: {
                  value: 6,
                  message: 'Ваш пароль должен быть длиннее 6 символов.',
                },
              })}
            />
            <label htmlFor='password'>Пароль</label>
            {showPassword ? (
              <EyeOutlined
                className={styles['auth__input-icon']}
                onClick={() => setShowPassword((state) => !state)}
                style={{ color: '#fc8507' }}
              />
            ) : (
              <EyeInvisibleOutlined
                className={styles['auth__input-icon']}
                onClick={() => setShowPassword((state) => !state)}
              />
            )}
          </label>
          {(errors.email?.message || errors.password?.message) && (
            <span className={styles['auth__input-error-message']}>
              {errors.email?.message ? errors.email.message : errors.password?.message}
            </span>
          )}
          {authErr && !errors.email && !errors.password && !isReg && (
            <span className={styles['auth__input-error-message']}>Неправильный email или пароль.</span>
          )}
          {isOccupied && !errors.email && !errors.password && isReg && (
            <span className={styles['auth__input-error-message']}>Такой пользователь уже есть.</span>
          )}
          {isReg ? (
            <Link
              to='/'
              onClick={(e) => {
                e.preventDefault();
                setIsReg(false);
              }}
            >
              Уже есть аккаунт?
            </Link>
          ) : (
            <Link to='/' onClick={(e) => e.preventDefault()}>
              Забыли пароль?
            </Link>
          )}
          <button>{isReg ? 'Зарегистрироваться' : 'Войти'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
