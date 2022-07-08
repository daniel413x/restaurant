import FoodItemInCart from '../db/models/FoodItemInCart';
import FoodItemInOrder from '../db/models/FoodItemInOrder';

export function calcItemPrice(price: number, discount?: number) {
  let returnedPrice = price;
  if (discount) {
    returnedPrice = ((price) * (1000 - (discount * 1000)));
    returnedPrice *= 0.001;
  }
  return returnedPrice.toFixed(2);
}

export function calcTotal(arr: FoodItemInOrder[] | FoodItemInCart[]) {
  let total = 0;
  if (arr.length === 0) {
    return total;
  }
  arr.forEach((foodItem) => {
    const { quantity, discount, price } = foodItem;
    const itemTotal = calcItemPrice(price! * quantity!, discount);
    total += Number(itemTotal) * 1000;
  });
  return total * 0.001;
}
