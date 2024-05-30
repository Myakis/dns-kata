import { Dispatch, SetStateAction } from 'react';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';

export interface ShopImage {
  id: number;
  url: string;
}

export interface ShopComponentProps {
  totalSlides: number;
  fullscreenMode: boolean;
  article: IShop;
  toggleFullscreenMode: (id: number) => void;
  shopImages: ShopImage[];
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
}

export interface DefaultProps {
  latitude: string;
  longitude: string;
  totalSlides: number;
  shopImages: ShopImage[];
  article: IShop;
  toggleFullscreenMode: (id: number) => void;
}

export interface FormValues {
  inputName: string;
  inputMail: string;
  inputPhone: string;
  inputMessage: string;
}

export interface Bank {
  name: string;
}
