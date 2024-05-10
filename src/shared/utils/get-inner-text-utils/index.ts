export const getInnerText = (element: HTMLElement): string => {
  return element.innerText
    .split(' ')
    .map((item) =>
      item
        .split('')
        .filter((char) => /^[а-яА-Я]+$/.test(char))
        .join('')
    )
    .join(' ');
};
