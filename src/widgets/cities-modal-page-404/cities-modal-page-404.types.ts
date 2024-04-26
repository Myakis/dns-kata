import { CSSProperties } from 'react';

export interface CitiesListItemProps {
  name: string;
  cb: () => void;
}
export interface CitiesModalProps {
  label?: string;
  labelStyle?: CSSProperties;
}

export interface ITerritory {
  region: null | number;
  district: null | number;
}
