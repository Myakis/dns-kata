export interface CitiesListItemProps {
  name: string;
  cb: () => void;
}
export interface CitiesModalProps {
  isModalOpen: boolean;
  closeModalHandler: () => void;
}

export interface ITerritory {
  region: null | number;
  district: null | number;
}
