import styles from './aside-helper-btns.module.scss';
import { asideHelperBtnsSlice } from 'shared/store/slices/aside-helper-btns-slice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import clsx from 'clsx';
import { FC } from 'react';
import { useOnScroll } from 'shared/hooks/useOnScroll';

export const ChatBtn: FC = () => {
  const { chatBtn } = asideHelperBtnsSlice.actions;
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  const dispatch = useAppDispatch();

  return (
    <button
      className={clsx(styles.btns, styles.chatToggle, chatBtnClicked ? styles.opened : styles.closed)}
      onClick={() => dispatch(chatBtn(!chatBtnClicked))}
    ></button>
  );
};

export const ScrollBtn: FC = () => {
  const isScrolled = useOnScroll();

  return (
    <button
      className={clsx(styles.btns, styles.scrollToggle, styles.disabled, isScrolled && styles.active)}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <i></i>
    </button>
  );
};
