import styles from './modal.module.scss';

const Modal = ({
  dialog,
  isModalOpen,
  closeModalHandler,
}: {
  dialog: any;
  isModalOpen: boolean;
  closeModalHandler: () => void;
}) => {
  if (isModalOpen) {
    return (
      <div className={styles['modal']} onClick={closeModalHandler}>
        {dialog}
      </div>
    );
  }
};

export default Modal;
