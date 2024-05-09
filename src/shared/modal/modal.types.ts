import { FC } from 'react';

export interface IModalProps {
  Dialog: FC<any>;
  isModalOpen: boolean;
  closeModalHandler: () => void;
}
