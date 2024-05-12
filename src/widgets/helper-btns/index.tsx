import styles from './helper-btns.module.scss';
import classNames from 'classnames';
import { helperBtnsSlice } from 'shared/store/slices/helper-btns-slice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { FC } from 'react';

export const ChatBtn: FC = () => {
  const { chatBtn } = helperBtnsSlice.actions;
  const chatBtnClicked = useAppSelector((state) => state.helperBtns.chatBtnClicked);
  const dispatch = useAppDispatch();

  return (
    <button
      className={classNames(
        styles.chatToggle,
        { [styles.chatToggleClosed]: !chatBtnClicked },
        { [styles.chatToggleOpened]: chatBtnClicked }
      )}
      onClick={() => dispatch(chatBtn(!chatBtnClicked))}
    ></button>
  );
};

export const ScrollBtn: FC = () => {
  return <div>ScrollBtn</div>;
};
