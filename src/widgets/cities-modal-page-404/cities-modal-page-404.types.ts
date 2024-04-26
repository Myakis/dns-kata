import { CSSProperties } from 'react';
import { ICurrentCity } from 'widgets/page-404-shops/page-404-shops.types';

export interface CitiesListItemProps {
  name: string;
  cb: () => void;
}
export interface CitiesModalProps {
  label?: string;
  labelStyle?: CSSProperties;
  callback?: (city: ICurrentCity) => void;
}

export interface ITerritory {
  region: null | number;
  district: null | number;
}
