/*
  банально обрезает по количеству букв до лимита, а после до ближайшего пробела.
  если пробелов не будет то п***а))) может поставить точки в конце если dotdotdot = true.
*/

type sdFunc = (prevText: string, limit: number, dotdotdot?: boolean) => string;
export const shortingText: sdFunc = (prevText, limit, dotdotdot = false) => {
  const arrd = prevText.split('');
  const newText = arrd.slice(0, arrd.indexOf(' ', limit));

  return `${newText.join('')}${dotdotdot && '...'}`;
};
