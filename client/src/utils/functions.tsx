import { IFoodItem } from '../types/types';

export function makeId(string: string) {
  const id = string.toLowerCase().split(' ').join(' ');
  return id;
}

export function calcItemPrice(price: number, discount?: number) {
  let returnedPrice = price;
  if (discount) {
    returnedPrice = ((price) * (1000 - (discount * 1000)));
    returnedPrice *= 0.001;
  }
  return returnedPrice.toFixed(2);
}

export function countItems(arr: IFoodItem[]) {
  let count = 0;
  arr.forEach((item) => {
    count += item.quantity || 0;
  });
  return count;
}

export function timestamp() {
  return new Date().toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
