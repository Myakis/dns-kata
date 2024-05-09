export interface ICoord {
  latitude: number;
  longitude: number;
}
export interface IShop {
  id: number;
  name: string;
  location: number[];
  description: string;
  inOpen: boolean;
  inNear: boolean;
  streetAddress: string;
}
export interface ShopItemProps {
  name: string;
  address: string;
  coords: number[];
  clickHandler: (coord: ICoord) => void;
}

export interface ICurrentCity {
  name: string;
  coords: ICoord;
}
