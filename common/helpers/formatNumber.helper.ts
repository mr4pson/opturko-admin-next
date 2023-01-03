export const formatNumber = (number: number | string) => {
  const parts = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .split('.');

  const leftPart = parts[0];
  const rightPart = parts[1].replace(' ', '');
  const arr = [leftPart];

  if (rightPart) {
    arr.push(rightPart);
  }

  return arr.join('.');
};
