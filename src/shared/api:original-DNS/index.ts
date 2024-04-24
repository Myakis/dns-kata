export interface IDistrict {
  id: number;
  name: string;
}

export interface IRegion {
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
  data: {
    districts: IDistrict[];
    regions: IRegion[];
    bigCities: ICity[];
    cities: ICity[];
  };
}

export async function getCities(): Promise<ICities> {
  const response = await fetch('https://restapi.dns-shop.ru/v1/get-city-list');

  if (!response.status) {
    throw new Error(response.statusText);
  }

  const data = response.json();

  return data;
}
