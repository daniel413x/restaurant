import { OrderOrCartFoodItem } from '../types/types';

export function makeId(string: string) {
  const id = string.toLowerCase().split(' ').join('-');
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

export function calcTotal(foodItems: OrderOrCartFoodItem[]) {
  let total = 0;
  if (foodItems.length === 0) {
    return total;
  }
  foodItems.forEach((foodItem) => {
    const { quantity, discount, price } = foodItem;
    const itemTotal = calcItemPrice(price! * quantity!, discount);
    total += Number(itemTotal) * 1000;
  });
  return (total * 0.001).toFixed(2);
}

export function countItems(arr: OrderOrCartFoodItem[]) {
  let count = 0;
  arr.forEach((item) => {
    count += item.quantity || 0;
  });
  return count;
}

export function actionTimestamp(string: string) {
  return new Date(string).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function orderDate(string: string) {
  return new Date(string).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function validateEmail(string: string): boolean {
  const formattedEmail = ['', ''];
  string.split('@').forEach((p: string, i: number) => {
    formattedEmail[i] = p;
  });
  const [local, domain] = formattedEmail;
  const expectedLength = formattedEmail.length === 2;
  if (expectedLength && local && domain) {
    return true;
  }
  return false;
}

export function validatePassword(string: string): boolean {
  return /(?=^\S{6,256}$)^.+$/i.test(string);
}
