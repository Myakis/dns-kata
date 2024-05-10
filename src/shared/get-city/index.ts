import { currentCitySlice } from 'shared/store/slices/current-city-slice';

/**
 *  getCity используется для загрузки данных о текущем городе из localStorage.
 * Если данные есть, возвращается action.
 * Если при загрузке данных возникает ошибка, localStorage очищается.
 */
const getCity = () => {
  const { chooseCurrentCity, setInitialCity } = currentCitySlice.actions;

  try {
    const localCity = localStorage.getItem('currentCity');

    return localCity ? () => chooseCurrentCity(JSON.parse(localCity)) : setInitialCity;
  } catch {
    localStorage.removeItem('currentCity');
    return setInitialCity;
  }
};

export default getCity();
