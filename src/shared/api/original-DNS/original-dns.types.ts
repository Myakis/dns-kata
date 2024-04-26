interface IDistrict {
  id: number;
  name: string;
}

interface IRegion {
  id: number;
  name: string;
  districtId: number;
}

export interface ICity {
  id: string;
  name: string;
  regionId: number;
  citySlug: string;
  latitude: number;
  longitude: number;
  code: string;
  shopUrl: string;
}

export interface ICities {
  message: string;
  data?: {
    districts: IDistrict[];
    regions: IRegion[];
    bigCities: ICity[];
    cities: ICity[];
  };
  loading?: boolean;
}
