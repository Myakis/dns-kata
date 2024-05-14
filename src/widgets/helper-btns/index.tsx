import styles from './helper-btns.module.scss';
import { helperBtnsSlice } from 'shared/store/slices/helper-btns-slice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import clsx from 'clsx';
import { FC } from 'react';

export const ChatBtn: FC = () => {
  const { chatBtn } = helperBtnsSlice.actions;
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  const dispatch = useAppDispatch();

  return (
    <button
      className={clsx(styles.chatToggle, !chatBtnClicked && styles.closed, chatBtnClicked && styles.opened)}
      onClick={() => dispatch(chatBtn(!chatBtnClicked))}
    ></button>
  );
};

export const ScrollBtn: FC = () => {
  return <div>ScrollBtn</div>;
};
