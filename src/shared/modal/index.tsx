import { FC } from 'react';
import styles from './modal.module.scss';
import { IModalProps } from './modal.types';

const Modal: FC<IModalProps> = ({ Dialog, isModalOpen, closeModalHandler }) => {
  if (isModalOpen) {
    return (
      <div className={styles['modal']} onClick={closeModalHandler}>
        <Dialog isModalOpen={isModalOpen} closeModalHandler={closeModalHandler} />
      </div>
    );
  }
};

export default Modal;
